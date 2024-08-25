import {
  Bot,
  GrammyError,
  HttpError,
  InlineKeyboard,
  webhookCallback,
} from "grammy";
import express from 'express';
import "dotenv/config";

const app = express()
const PORT = 3000
const endpoint =
  "";
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) throw new Error("Token not Found!");
const bot = new Bot(TOKEN);
//api.telegram.org/bot7344528094:AAFHZ5zofbZkdU9TX5fs4IWbpGIBPYBlcm0/deleteWebhook?url=
https: app.use(webhookCallback(bot, "express"));

  bot.command("start", async (ctx) => {
    await ctx.reply("<b>Welcome to chat Bot Serega</b>", {
      parse_mode: "HTML",
    });
  });

    bot.hears(/about/, async (ctx) => {
      const me = await bot.api.getMe();
      ctx.reply(me.id);
    });

app.get("/", (req, res) => {
  res.send("...Server is Running...");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


