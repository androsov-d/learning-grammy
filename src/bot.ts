import { getMessageText, filterMessage } from './utils';
import {
  KeyboardValue,
  createInlineKeyboard,
  isOneTime,
  modifyKeyboard,
  getButtonIndex,
} from './utils/keyboard';
import { Bot, GrammyError, HttpError } from 'grammy';
import dotenv from 'dotenv';
import logger from './services/logger';

dotenv.config();

async function setBotCommands(bot: Bot) {
  try {
    await bot.api.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'like', description: "Add 'like' reaction on the message" },
      { command: 'add', description: 'Add items and receive confirmation' },
    ]);
    logger.info('Successfully set bot commands!');
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    logger.error(`Error setting bot commands: ${errorMessage}`);
  }
}

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const values: Array<KeyboardValue> = [
  ['1', 'first', false],
  ['2', 'second', true],
  ['3', 'third', false],
];

bot.command('start', ctx => {
  const keyboard = createInlineKeyboard(values);
  ctx.reply(`Hello, ${ctx.from?.first_name}!`, {
    reply_markup: keyboard,
  });
});

bot.on('callback_query:data', async ctx => {
  const callbackData = ctx.callbackQuery.data;
  const buttonIndex = getButtonIndex(callbackData, values);
  await ctx.answerCallbackQuery({ text: values[buttonIndex][0] });

  if (isOneTime(callbackData as string, values)) {
    await ctx.editMessageReplyMarkup({
      reply_markup: modifyKeyboard(callbackData as string, values),
    });
  }
});

bot.command('like', ctx => ctx.react('👍'));
bot.command('add', ctx => ctx.reply(`You added ${getMessageText(ctx)}`));

bot.on('message', ctx => {
  const message = ctx.message.text;
  const filteredMessage = filterMessage(message!);
  if (filteredMessage !== '') {
    ctx.reply(filteredMessage);
  }
});

bot.catch(err => {
  const ctx = err.ctx;
  logger.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    logger.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    logger.error('Could not contact Telegram:', e);
  } else {
    logger.error('Unknown error:', e);
  }
});

async function startBot() {
  await setBotCommands(bot);
  await bot.start();
}

startBot();
