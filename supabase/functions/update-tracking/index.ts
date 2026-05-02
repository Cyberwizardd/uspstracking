import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Update estimated_delivery and estimated_delivery_at for ES9885768587US
  const { error } = await supabase
    .from("tracking")
    .update({
      estimated_delivery: "Monday, May 8, 2026",
      estimated_delivery_at: "2026-05-08T18:00:00Z",
    })
    .eq("tracking_number", "ES9885768587US");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
