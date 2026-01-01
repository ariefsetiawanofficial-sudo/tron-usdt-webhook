import express from "express";

const app = express();
app.use(express.json({ limit: "2mb" }));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get("/", (_, res) => res.send("OK"));

app.get("/ping", async (req, res) => {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ ok: false, error: "BOT_TOKEN/CHAT_ID missing" });
    }

    const tgResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: "✅ Ping dari Render" })
    });

    const tgJson = await tgResp.json();
    console.log("Telegram response:", tgJson);

    if (!tgJson.ok) return res.status(500).json(tgJson);
    return res.json(tgJson);
  } catch (err) {
    console.error(err);
    return res.status(500).send(String(err));
  }
});

app.post("/tron-usdt", async (req, res) => {
  try {
    const tgResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: "🔔 Webhook OK" })
    });

    const tgJson = await tgResp.json();
    console.log("Telegram response:", tgJson);

    // Penting: kalau gagal, balikin 500 biar kelihatan
    if (!tgJson.ok) return res.status(500).send(tgJson.description || "Telegram error");

    return res.sendStatus(200);
  } catch (err) {
    console.error("ERROR:", err);
    return res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("Server running on port", PORT));
