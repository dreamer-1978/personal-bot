import {
  Bot,
  InlineKeyboard,
  webhookCallback,
} from "grammy";
import "dotenv/config";
import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors())
const PORT = 3000
const optionCors = {
  origin: "*"
}




const bot = new Bot(process.env.VITE_BOT_TOKEN);

//api.telegram.org/bot7344528094:AAFHZ5zofbZkdU9TX5fs4IWbpGIBPYBlcm0/deleteWebhook?url=
app.use(webhookCallback(bot, "express"));

app.get("/", cors(optionCors), (req, res) => {
  res.send(`Server is Running! create Token:`);
});

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


