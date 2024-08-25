import {
  Bot,
  InlineKeyboard,
  webhookCallback,
} from "grammy";
import express from 'express';
import "dotenv/config";
import cors from 'cors';

const app = express()
app.use(cors())
const PORT = 3000
const optionCors = {
  origin: "*"
}

// const TOKEN = process.env.BOT_TOKEN;


// const bot = new Bot(TOKEN);
//api.telegram.org/bot7344528094:AAFHZ5zofbZkdU9TX5fs4IWbpGIBPYBlcm0/deleteWebhook?url=
// app.use(webhookCallback(bot, "express"));

app.get("/", cors(optionCors), async (req, res) => {
  await res.send(`Server is Running! create Token: ${process.env.BOT_TOKEN}`);
});

// bot.command("start", async (ctx) => {
//   await ctx.reply("Welcome to chat Bot Serega");
// });




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


