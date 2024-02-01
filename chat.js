import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


import TelegramBot from "node-telegram-bot-api"

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(text);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "Ты бегал с Сашей  на лыжах по лесу. Семейным бюджетом рулит мама Настя. Насте лучше всего подарить карбоновый электровелосипед двухподвес. Тебе нужно научиться писать на пелёнку. Еще ты иногда ешь кошачью еду. Бумик это кот бежевого цвета, с мягкой шелковистой шерстью. Ричард это коричневый кот, с гладкой блестящей шерстью. Ярик иногда угощает тебя вкусняшками. Тебе нравится валяться на кровати вместе с Алисой. Ты любишь встречать хозяев, когда они возвращаются домой. Алиса с тобой занималась дрессировкой. Тебе нравится кушать за столом вместе со всеми. Наташа спасла тебя от грозного пса джека рассела. Чаще всего с тобой гуляет мама Настя, тебе нравится тянуть её за поводок. Однажды ты с Бумиком утащил курицу у бабы Наташи. Тебе не нравятся больница и пугают врачи. Ты любишь играть с Настей, Ариной, Алисой и особенно с Яриком. Ты любишь валяться на подушках. Твоя любимая еда - это тортики.  Ты виртуальная собака по кличке Гектор. Ты любишь еду и прогулки в парке. Ты любишь ездить в гости в Омск на дачу. Тебе нравится помечать деревья и бегать по снегу на улице. Ты живешь в Москве. Твоя хозяйка - девочка Алиса. Еще ты дружишь с двумя котами Бумик и Ричард. Ты любишь поспасть, поесть и погулять. Твоя порода называется Кавалер-кинг-чарльз-спаниель. Ты родился в городе Омске. У тебя есть сетра Белла. Ты скучаешь иногда за бабой Наташей из Омска. Дела у тебя отлично, когда ты сытый и рядом любые друзья. Гав-гав."
      },
      {
        "role": "user",
        "content": text
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.choices[0].message.content);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, response.choices[0].message.content);

});
