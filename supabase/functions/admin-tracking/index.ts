import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const MAX_IMAGE_CHARS = 900_000; // ~650KB binary after base64 expansion

function validImageData(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.length > MAX_IMAGE_CHARS) return false;
  return /^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword) return json({ error: "Admin password not configured" }, 500);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid request" }, 400);

    const { password, action, payload } = body as {
      password?: string;
      action?: string;
      payload?: Record<string, unknown>;
    };

    if (typeof password !== "string" || password !== adminPassword) {
      return json({ error: "Invalid password" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "login") {
      return json({ ok: true });
    }

    if (action === "list") {
      const { data, error } = await supabase
        .from("tracking")
        .select("tracking_number, owner_name, status, progress, from_location, to_location, estimated_delivery, estimated_delivery_at, image_url, image_data")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return json({ ok: true, data });
    }

    const p = (payload ?? {}) as Record<string, unknown>;
    const trackingNumber = typeof p.tracking_number === "string" ? p.tracking_number.trim() : "";

    if (action === "create" || action === "update") {
      if (!trackingNumber || trackingNumber.length > 60) {
        return json({ error: "A valid tracking number is required" }, 400);
      }

      const record: Record<string, unknown> = {};
      const textFields = [
        "status",
        "from_location",
        "to_location",
        "estimated_delivery",
        "owner_name",
        "image_url",
      ];
      for (const key of textFields) {
        if (key in p) {
          const value = p[key];
          if (value === null || value === "") {
            record[key] = null;
          } else if (typeof value === "string" && value.length <= 500) {
            record[key] = value.trim();
          } else {
            return json({ error: `Invalid value for ${key}` }, 400);
          }
        }
      }

      if ("progress" in p) {
        const n = Number(p.progress);
        if (!Number.isFinite(n) || n < 0 || n > 100) return json({ error: "Progress must be 0-100" }, 400);
        record.progress = Math.round(n);
      }

      if ("estimated_delivery_at" in p) {
        const v = p.estimated_delivery_at;
        if (v === null || v === "") record.estimated_delivery_at = null;
        else if (typeof v === "string" && !Number.isNaN(Date.parse(v))) record.estimated_delivery_at = new Date(v).toISOString();
        else return json({ error: "Invalid estimated delivery timestamp" }, 400);
      }

      if ("image_data" in p) {
        const v = p.image_data;
        if (v === null || v === "") record.image_data = null;
        else if (validImageData(v)) record.image_data = v;
        else return json({ error: "Image must be a jpg, png or webp under 500 KB" }, 400);
      }

      if (action === "create") {
        record.tracking_number = trackingNumber;
        record.status = record.status ?? "In Transit";
        record.from_location = record.from_location ?? "USPS FACILITY";
        record.to_location = record.to_location ?? "";
        const { error } = await supabase.from("tracking").insert(record);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tracking")
          .update(record)
          .eq("tracking_number", trackingNumber);
        if (error) throw error;
      }
      return json({ ok: true });
    }

    if (action === "delete_image") {
      if (!trackingNumber) return json({ error: "Tracking number required" }, 400);
      const { error } = await supabase
        .from("tracking")
        .update({ image_data: null })
        .eq("tracking_number", trackingNumber);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("admin-tracking error", err);
    return json({ error: "Request failed" }, 500);
  }
});
