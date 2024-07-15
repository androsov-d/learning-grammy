import { getMessageText, filterMessage } from "./utils";
import { Api, Bot, Context } from "grammy";
import dotenv from "dotenv";

dotenv.config();

function setCommands() {
  bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "like", description: "Add 'like' reaction on the message" },
    { command: "add", description: "Add items and receive confirmation" },
  ]);
}

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command("start", (ctx) => {
  ctx.reply(`Hello, ${ctx.from?.first_name}!`);
  setCommands();
});
bot.command("like", (ctx) => ctx.react("👍"));
bot.command("add", (ctx) => ctx.reply(`You added ${getMessageText(ctx)}`));

bot.on("message", (ctx) => {
  const message = ctx.message.text;
  const filteredMessage = filterMessage(message!);
  if (filteredMessage !== "") {
    ctx.reply(filteredMessage);
  }
});

bot.start();
