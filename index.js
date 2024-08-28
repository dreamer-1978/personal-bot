import axios from "axios";
import CurrencyAPI from "@everapi/currencyapi-js";
import { Bot, InlineKeyboard, webhookCallback, Keyboard } from "grammy";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const endpoint = "https://personal-bot-bice.vercel.app";

const PORT = 3000;
const optionCors = {
  origin: "*",
};

const TOKEN = process.env.VITE_BOT_TOKEN;
const my_id = process.env.VITE_MY_ID;
const usd = process.env.VITE_USD;
const currencyApi = new CurrencyAPI(usd);
const bot = new Bot(TOKEN);

app.post(`/`, webhookCallback(bot, "express"));

app.get("/", cors(optionCors), (req, res) => {
  res.send(`Server is Running!`);
});


// USD
async function getUsd() {
  const response = await currencyApi.latest({
    base_currency: "USD",
    currencies: "RUB",
  });
  const result = response;
  return result;
}
async function getEur() {
  const response = await currencyApi.latest({
    base_currency: "EUR",
    currencies: "RUB",
  });
  const result = response;
  return result;
}
// END USD
// BOT COMMAND!!!


bot.api.setMyCommands([
  { command: "share", description: "Гео & Контакт" },
  { command: "usd", description: "Курс Валют" },
]);

bot.command("start", async (ctx) => {
  if (my_id) {
    ctx.reply("<b>Привет Серега</b>", {
      parse_mode: "HTML",
    });
  } else {
    ctx.reply("Иди от сюда не знаю я тебя!");
  }
});

bot.command("share", async (ctx) => {
  const keyboard = new Keyboard()
    .requestLocation("Геолокация")
    .requestContact("Контакт")
    .placeholder("Данные")
    .resized();
  await ctx.reply("Гео & Контакт", {
    reply_markup: keyboard,
  });
});

https: bot.command("usd", async (ctx) => {
  const usd = await getUsd();
  const eur = await getEur();
  const rub = Math.floor(usd.data.RUB.value * 100) / 100;
  const rub_eur = Math.floor(eur.data.RUB.value * 100) / 100;
  await ctx.reply(`Курс Валют \n USD: <b>${rub}</b> \n EUR: <b>${rub_eur}</b>`, {
    parse_mode: "HTML",
  });
});

bot.hears(/gpt/, async (ctx) => {
  const content = ctx.message.text
  if (content) {
    const response = await axios("https://giga-chat-teal.vercel.app/data", {
      params: {
        content: content,
      }
    })
    const data = response.data.message
    await ctx.reply(`<b>${data}</b>`, {
      parse_mode: "HTML",
    })
  }
})



// bot.command("inline_keyboard", async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("1", "button-1")
//     .row()
//     .text("2", "button-2")
//     .row()
//     .text("3", "button-3");
//   await ctx.reply("Choices number...", {
//     reply_markup: inlineKeyboard,
//   });
// });
// bot.callbackQuery(["button-1", "button-2", "button-3"], async (ctx) => {
//    console.log(ctx.from.id);
//   await ctx.answerCallbackQuery();
//   await ctx.reply('Choices')
// });
// bot.callbackQuery(/button-[1-3]/, async (ctx) => {
//   console.log(ctx.from.id)
//   await ctx.answerCallbackQuery();
//   await ctx.reply(`Вы нажали кнопку ${ctx.callbackQuery.data}`);
// });
// bot.on('callback_query:data', async (ctx) => {
//   await ctx.answerCallbackQuery();
//   await ctx.reply(`Вы нажали кнопку ${ctx.callbackQuery.data}`);
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// bot.start();
