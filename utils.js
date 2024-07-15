"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageText = getMessageText;
exports.filterMessage = filterMessage;
function getMessageText(ctx) {
    var _a;
    const fullText = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
    const messageText = fullText === null || fullText === void 0 ? void 0 : fullText.split(" ").slice(1).join(" ");
    return messageText;
}
function filterMessage(message) {
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
