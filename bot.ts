import { Bot, Context } from "grammy";

function getMessageText(ctx: Context) {
  const fullText = ctx.message?.text;
  const messageText = fullText?.split(" ").slice(1).join(" ");
  return messageText;
}

function filterMessage(message: String) {
  let isFiltered = false;

  const filters = ["абрикос", "киви", "манго"];
  const words = message.split(" ");
  const filteredWords = words.map((word) => {
    for (const filter of filters) {
      if (word.includes(filter)) {
        isFiltered = true;
        return word.replace(/[\u0400-\u04FF]+/g, "FILTERED");
      }
    }
    return word;
  });

  return isFiltered ? filteredWords.join(" ") : "";
}

const bot = new Bot("7231883533:AAHTcdrpBJ4jSvDYgh7ujJbU1CylOgzG2Yk");

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
