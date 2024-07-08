import { Bot } from "grammy";

const bot = new Bot("7231883533:AAHTcdrpBJ4jSvDYgh7ujJbU1CylOgzG2Yk");

bot.command("start", (ctx) => ctx.reply(`Hello, ${ctx.from?.first_name}!`));
