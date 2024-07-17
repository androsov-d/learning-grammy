import { getMessageText, filterMessage } from "./utils";
import { Api, Bot, Context, BotError, GrammyError, HttpError } from "grammy";
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

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
