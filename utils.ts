import { Context } from "grammy";

export function getMessageText(ctx: Context) {
  const fullText = ctx.message?.text;
  const messageText = fullText?.split(" ").slice(1).join(" ");
  return messageText;
}

export function filterMessage(message: string) {
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
