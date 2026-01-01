import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json({ limit: "2mb" }));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/tron-usdt", async (req, res) => {
  try {
    const text = `🔔 Webhook OK\n\n${JSON.stringify(req.body, null, 2)}`.slice(0, 3900);

    const tgResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        disable_web_page_preview: true
      })
    });

    const tgJson = await tgResp.json();
    console.log("Telegram response:", tgJson);

    if (!tgJson.ok) {
      // Biar QuickNode kelihatan gagal & kamu lihat error jelas di logs
      return res.status(500).send(`Telegram error: ${tgJson.description}`);
    }

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.status(500).send(String(e));
  }
});
