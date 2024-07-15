import { getMessageText, filterMessage } from "./utils";
import { Bot, Context } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command("start", (ctx) => ctx.reply(`Hello, ${ctx.from?.first_name}!`));
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
