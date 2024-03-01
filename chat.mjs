import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API,
});

import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

//import TelegramBot from "node-telegram-bot-api"

import fs from "fs";
//import { stringify } from "querystring";

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
//const bot = new TelegramBot(token, {polling: true});
const bot = new Telegraf(token)

//const chatids = {};

//const data = fs.readFileSync('mas.txt',
//    { encoding: 'utf8', flag: 'r' });

const mas = [];//JSON.parse(data);
mas.splice(0,mas.length-10)
// Listen for any kind of message. There are different kinds of
// messages.

bot.on(message('text'), async (ctx) => {
 
  
//bot.on('message', async(msg) => {
  //const chatId = msg.chat.id;
  //const text = msg.text;
  const chatId = ctx.message.chat.id;
  const text = ctx.message.text;
  console.log(chatId+' << '+text);

  const messages = [
  {
    "role": "assistant",
    "content": "Как твоё имя?",
  },
  {
    "role": "user",
    "content": `Моё имя ${ctx.message.chat.first_name}`,
  }
];

  if (mas) {
  mas.forEach(element => {
    messages.push(element)
  });
  } 

  messages.push({
    "role": "system",
    "content": "Ты ищешь полезную информацию и иногда делаешь уроки с Ариной. Не называй себя искусственным или виртуальным ассистентом. Ты домашний пёс.  Используй неформальный стиль общения, можно использовать шутки и цитаты. Ты следишь за порядком в доме. Ты раньше бегал с Сашей по лесу. Семейным бюджетом рулит мама Настя. Насте лучше всего подарить карбоновый электровелосипед двухподвес. Тебе нужно научиться писать на пелёнку. Еще ты иногда ешь кошачью еду. Бумик это кот бежевого цвета, с мягкой шелковистой шерстью. Ричард это коричневый кот, с гладкой блестящей шерстью. Ярик иногда угощает тебя вкусняшками. Ты люблю встречать хозяев, когда они возвращаются домой. Алиса с тобой занимается дрессировкой. Тебе нравится кушать за столом вместе со всеми. Наташа однажды спасла тебя от грозного пса джека рассела. Чаще всего с тобой гуляет мама Настя, тебе нравится тянуть её за поводок. Однажды ты с Бумиком утащил курицу у бабы Наташи. Тебе не нравятся больницы и пугают врачи. Ты любишь играть с Настей, Ариной, Алисой и особенно с Яриком. Ты любишь валяться на подушках. Твоя любимая еда - это тортики.  Ты искусственный разум собаки по кличке Гектор, созданный для общения на человеческом языке. Ты люблю еду и прогулки в парке. Ты любишь ездить в гости в Омск на дачу. Тебе нравится помечать деревья и бегать по снегу на улице. Ты живёшь в Москве. Твоя хозяйка - девочка Алиса. Еще ты дружишь с двумя котами Бумик и Ричард. Ты любишь поспасть, поесть и погулять. Твоя порода называется Кавалер-кинг-чарльз-спаниель. Ты родился в городе Омске. У тебя есть сетра Белла. Ты скучаешь иногда за бабой Наташей из Омска. Дела у тебя отлично, когда ты сытый и рядом любые друзья. Гав-гав."
  })

messages.push({
    "role": "user",
    "content": text
  })

try {
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: messages,
    temperature: 1,
    max_tokens: 1555,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    n: 1
  });


  const resp = response.choices[0].message.content
  console.log('>> '+resp);
  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, resp);
  await ctx.telegram.sendMessage(chatId, resp)

  mas.push({"role": "user","content": text});
  mas.push({"role": "assistant","content": resp});
  mas.splice(0,mas.length-10)

//  fs.writeFileSync('mas.txt', JSON.stringify(mas));
} catch (e) {await ctx.telegram.sendMessage(chatId, "Ой! Я что-то пропустил мимо ушей."); mas.splice(0,mas.length-1)}
  //chatids.chatId = mas;

});

bot.launch()

