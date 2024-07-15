"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const grammy_1 = require("grammy");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function setCommands() {
    bot.api.setMyCommands([
        { command: "start", description: "Start the bot" },
        { command: "like", description: "Add 'like' reaction on the message" },
        { command: "add", description: "Add items and receive confirmation" },
    ]);
}
const bot = new grammy_1.Bot(process.env.TELEGRAM_BOT_TOKEN);
bot.command("start", (ctx) => {
    var _a;
    ctx.reply(`Hello, ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}!`);
    setCommands();
});
bot.command("like", (ctx) => ctx.react("👍"));
bot.command("add", (ctx) => ctx.reply(`You added ${(0, utils_1.getMessageText)(ctx)}`));
bot.on("message", (ctx) => {
    const message = ctx.message.text;
    const filteredMessage = (0, utils_1.filterMessage)(message);
    if (filteredMessage !== "") {
        ctx.reply(filteredMessage);
    }
});
bot.start();
