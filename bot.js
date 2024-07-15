"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
function getMessageText(ctx) {
    var _a;
    const fullText = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
    const messageText = fullText === null || fullText === void 0 ? void 0 : fullText.split(" ").slice(1).join(" ");
    return messageText;
}
function filterMessage(message) {
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
const bot = new grammy_1.Bot("7231883533:AAHTcdrpBJ4jSvDYgh7ujJbU1CylOgzG2Yk");
bot.command("start", (ctx) => { var _a; return ctx.reply(`Hello, ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}!`); });
bot.command("like", (ctx) => ctx.react("👍"));
bot.command("add", (ctx) => ctx.reply(`You added ${getMessageText(ctx)}`));
bot.on("message", (ctx) => {
    const message = ctx.message.text;
    const filteredMessage = filterMessage(message);
    if (filteredMessage !== "") {
        ctx.reply(filteredMessage);
    }
});
bot.start();
