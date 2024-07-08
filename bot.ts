import { Bot } from "grammy";

const bot = new Bot("7231883533:AAHTcdrpBJ4jSvDYgh7ujJbU1CylOgzG2Yk");

bot.command("start", (ctx) => ctx.reply(`Hello, ${ctx.from?.first_name}!`));
bot.command("like", (ctx) => ctx.react("👍"));
bot.command("add", (ctx) => {
  const fullText = ctx.message?.text;
  const messageText = fullText?.split(" ").slice(1).join(" ");
  ctx.reply(`You added ${messageText}`);
});

bot.start();
