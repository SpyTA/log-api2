export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const WEBHOOK = process.env.DISCORD_WEBHOOK; // ENV'DEN

  if (!WEBHOOK) {
    return res.status(500).json({ error: "Webhook missing" });
  }

  const { title, description } = req.body || {};

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Roblox Logger",
      embeds: [{
        title: title || "Log",
        description: description || "No content",
        color: 3066993,
        footer: { text: "Vercel Anti HTTP Spy" },
        timestamp: new Date().toISOString()
      }]
    })
  });

  res.status(200).json({ success: true });
}
