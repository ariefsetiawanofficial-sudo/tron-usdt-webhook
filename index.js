import express from "express";

const app = express();
app.use(express.json({ limit: "2mb" }));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("BOT_TOKEN or CHAT_ID is missing");
}

app.post("/tron-usdt", async (req, res) => {
  try {
    const text = "🔔 Webhook OK";

    const tgResp = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    );

    const tgJson = await tgResp.json();
    console.log("Telegram response:", tgJson);

    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR:", err);
    res.sendStatus(500);
  }
});

app.get("/", (_, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
