import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { parseFeed } from "https://deno.land/x/rss@0.5.5/mod.ts"; // ✅ Deno-compatible RSS parser

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  try {
    const rssUrl = "https://rss.app/feeds/fZbhI294LJv3Likg.xml";
    const response = await fetch(rssUrl);
    const xml = await response.text();
    const feed = await parseFeed(xml);
    const items = feed.entries.slice(0, 10).map((item) => ({
      title: item.title?.value,
      link: item.links?.[0]?.href,
      pubDate: item.published,
      content: item.description?.value || item.content?.value
    }));
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  } catch (error) {
    console.error("❌ Error fetching or parsing RSS feed:", error);
    return new Response("Error fetching RSS feed", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }
}); 