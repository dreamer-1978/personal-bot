// import {
//   Bot,
//   GrammyError,
//   HttpError,
//   InlineKeyboard,
//   webhookCallback,
// } from "grammy";
import express from 'express';
import "dotenv/config";

const app = express()
const PORT = 3000


const TOKEN = process.env.BOT_TOKEN;

// if (!TOKEN) throw new Error("Token not Found!");
const bot = new Bot(TOKEN);
//api.telegram.org/bot7344528094:AAFHZ5zofbZkdU9TX5fs4IWbpGIBPYBlcm0/deleteWebhook?url=
app.use(webhookCallback(bot, "express"));

app.get("/", (req, res) => {
  res.send("...Server is Running...");
});

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome to chat Bot Serega");
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


