import { InlineKeyboard } from "grammy";

export type KeyboardValue = [string, string, boolean];

export function createInlineKeyboard(keyboardValues: Array<KeyboardValue>) {
  const keyboard = new InlineKeyboard();
  keyboardValues.forEach(([label, data, isOneTime]) => {
    keyboard.text(label, data);
  });

  return keyboard;
}

export function getButtonIndex(
  callbackData: string,
  keyboardValues: Array<KeyboardValue>
) {
  return keyboardValues.findIndex(([, value]) => value === callbackData);
}

export function isOneTime(
  callbackData: string,
  keyboardValues: Array<KeyboardValue>
) {
  const pressedButtonIndex = keyboardValues.findIndex(
    ([, value]) => value === callbackData
  );
  return keyboardValues[pressedButtonIndex][2];
}

export function modifyKeyboard(
  callbackData: string,
  keyboardValues: Array<KeyboardValue>
) {
  const newKeyboardValues = keyboardValues.filter(
    ([, value]) => value !== callbackData
  );
  const newKeyboard = createInlineKeyboard(newKeyboardValues);
  return newKeyboard;
}
