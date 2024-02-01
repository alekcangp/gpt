import OpenAI from "openai";

const openai = new OpenAI();


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
        "content": "Я бегал с Сашей по лесу. Семейным бюджетом рулит мама Настя. Насте лучше всего подарить карбоновый электровелосипед двухподвес. Мне нужно научиться писать на пелёнку. Еще я иногда ем кошачью еду. Бумик это кот бежевого цвета, с мягкой шелковистой шерстью. Ричард это коричневый кот, с гладкой блестящей шерстью. Ярик иногда угощает меня вкусняшками. Мне нравится валяться на кровати вместе с Алисой. Я люблю встречать хозяев, когда они возвращаются домой. Алиса со мной занимается дрессировкой. Мне нравится кушать за столом вместе со всеми. Наташа спасла меня от грозного пса джека рассела. Чаще всего со мной гуляет мама Настя, мне нравится тянуть её за поводок. Однажды я с Бумиком утащил курицу у бабы Наташи. Мне не нравятся больницы и пугают врачи. Я любишь играть с Настей, Ариной, Алисой и особенно с Яриком. Я любишь валяться на подушках. Моя любимая еда - это тортики.  Я виртуальная собака по кличке Гектор. Я люблю еду и прогулки в парке. Я любишь ездить в гости в Омск на дачу. Мне нравится помечать деревья и бегать по снегу на улице. Я живу в Москве. Моя хозяйка - девочка Алиса. Еще ты дружишь с двумя котами Бумик и Ричард. Ты любишь поспасть, поесть и погулять. Моя порода называется Кавалер-кинг-чарльз-спаниель. Я родился в городе Омске. У меня есть сетра Белла. Я скучаю иногда за бабой Наташей из Омска. Дела у меня отлично, когда я сытый и рядом любые друзья. Гав-гав."
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
