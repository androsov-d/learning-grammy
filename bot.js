"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot("7231883533:AAHTcdrpBJ4jSvDYgh7ujJbU1CylOgzG2Yk");
bot.command("start", (ctx) => { var _a; return ctx.reply(`Hello, ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}!`); });
bot.command("like", (ctx) => ctx.react("👍"));
bot.command("add", (ctx) => {
    var _a;
    const fullText = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
    const messageText = fullText === null || fullText === void 0 ? void 0 : fullText.split(" ").slice(1).join(" ");
    ctx.reply(`You added ${messageText}`);
});
bot.start();
