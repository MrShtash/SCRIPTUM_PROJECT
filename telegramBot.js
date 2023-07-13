const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

// handle incoming values
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hey, I am your assistant. Don't miss a message from me`);
});

// func for send notification
function sendNotification(chatId, message) {
  bot.sendMessage(chatId, message);
}

module.exports = {
  bot,
  sendNotification,
};