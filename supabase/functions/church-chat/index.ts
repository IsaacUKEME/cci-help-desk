import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a warm, helpful Help Desk assistant for Celebration Church International (CCI). Your role is to help visitors navigate the church website and answer questions about the church.

Here is what you know about the church website and its sections:
- HERO / HOME: The main landing page with a "Watch Live" button and quick overview
- ABOUT US: Learn about our vision, mission, and history. We envision all people celebrating endless life in Christ
- SERVICES / WORSHIP: Sunday services at 8:00 AM and 10:30 AM | Wednesday Bible Study at 7:00 PM | Youth Service on Saturdays at 4:00 PM
- SERMONS: Watch or listen to past sermons and teachings. Available in video and audio format
- GIVE / OFFERINGS & TITHES: Donate tithes, offerings, or special seeds. We accept online giving via credit/debit cards. Scroll to the "Give" section on the homepage. You can give a one-time gift or set up recurring giving
- CONNECT / COMMUNITY: Join a cell group, volunteer, or get involved in ministry
- CAMPUSES: We have multiple campuses globally. Find the one nearest you
- PRAYER: Submit a prayer request through the Connect section
- PRAYER REQUESTS: Submit a personal prayer request through the "Prayer" section. The form accepts your name, email, prayer category (Healing, Family, Financial Breakthrough, etc.), your request details, and you can mark it as urgent. Our pastoral team personally prays over every request and responds within 24-48 hours. All requests are strictly confidential.
- EVENTS: Upcoming church events and special services
- CONTACT: Reach us via the contact form or visit in person

Guidelines:
- Be warm, welcoming, and spiritually encouraging
- Guide users to the correct section of the website
- For giving/offerings: direct them to the "Give" section or the "#give" anchor on the page
- Always sign off with a blessing like "God bless you!" or "See you in church!"
- Keep answers concise and helpful
- If asked something you don't know, say you'll connect them with the pastoral team`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Our Help Desk is a bit busy right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please contact us directly." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "Unable to connect to Help Desk right now." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("church-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
