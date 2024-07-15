import { Bot, Context } from "grammy";
import dotenv from "dotenv";

dotenv.config();

function getMessageText(ctx: Context) {
  const fullText = ctx.message?.text;
  const messageText = fullText?.split(" ").slice(1).join(" ");
  return messageText;
}

function filterMessage(message: String) {
  const filters = ["абрикос", "киви", "манго"];

  let isFiltered = false;
  const cyrillicChars = /[\u0400-\u04FF]+/g;

  const filteredWords = message.split(" ").map((word) => {
    for (const filter of filters) {
      if (word.includes(filter)) {
        isFiltered = true;
        return word.replace(cyrillicChars, "FILTERED");
      }
    }
    return word;
  });

  return isFiltered ? filteredWords.join(" ") : "";
}

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
