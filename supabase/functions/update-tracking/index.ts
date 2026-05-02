import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase
    .from("tracking")
    .update({
      estimated_delivery: "Monday, May 5, 2026",
      estimated_delivery_at: "2026-05-05T18:00:00Z",
      status: "In Transit (Package Delay)",
    })
    .eq("tracking_number", "ES9885768587US");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
