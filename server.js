const { Client } = require('discord.js');
const client = new Client();
const token = process.env.token;
const PREFIX = '!';
const fs = require('fs');

let queue = {};

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

var qq_fortunes = [
	'Постойте-ка, неужели меня пинганул **тот самый** ЧСВ? Не смей больше так делать, разговаривать с тобой не приносит никого удовольствия.',
	'Да как ты посмел, ЧСВ?'
];
var' w85ey_fortunes = [
	'Хотя постойте... ты ведь 85-ый. Вот, это тебе. *привела эльфийку в ошейнике* \nМожешь делать с ней всё, что захочешь.',
	'Хотя постойте... ты ведь 85-ый. Думаешь добиться моего внимания? Увы, но моего внимания достоин лишь мой хозяин.'
];
var subs_fortunes = [
	"Вы меня звали? Что вам надо, 'с легким презрением в глазах' уже не плеб…",
	"Что вы хотите, Господин Без Двух Минут Плеб? '*с холодом в глазах*'"
];
var special_fortunes = [
	'Кто меня звал? Н-новогодние лапки?! П-простите, господин! *кланяется* Что вам надо?',
	'Да-да? Что вы хотите? Ну… я немного занята… пожалуйста, позовите попозже… \n *где-то в дали и очень тихо* х-хозяин, только не ту…',
	'Приветствую вас, Новогодние лапки! Прошу, проходите… ',
	'З-здравствуйте, Новогодние лапки! С Новым Годом! А мы с хозяином очень **хорошо** отметили Новый Год… *слегка покраснела и отвела взгляд*'
];
var default_fortunes = [
	'Х-хозяин не разрешает общаться со всяким мусором... *разворачивается и уходит*',
	'Ч-что вам от меня надо!?Распинговались тут всякие, пф-ф... вы даже не подписчики, так... плебы...',
	'Меня кто-то звал? Хозяин, это вы? П-плеб?! Т-ты... как ты посмел?! Ничтожество! Не прикасайся ко мне!',
	'Что? Обращать внимание на вас? Слишком много чести! *вздергивает носик и уходит*'
];
var multiple_fortunes = [
	"Кто меня звал? Н-новогодние лапки?! П-простите, господин! '*кланяется*' Что вам надо?",
	"Да-да? Что вы хотите? Ну… я немного занята… пожалуйста, позовите попозже… \n '*где-то вдали и очень тихо*'' х-хозяин, только не ту…",
	"Вы меня звали? Что вам надо, '*с легким презрением в глазах*' уже не плеб…",
	"Что вы хотите, Господин Без Двух Минут Плеб? '*с холодом в глазах*'"
];
var mod_fortunes = [
	'Господин модератор? Чем могу помочь?',
	'Великий человек с хлыстом! Что вам надобно?',
	'У него банхамер! Осторожно, Хозяин… Я… я вас защищу!',
	"Что тебе надо пле… Модератор?! П-прошу прощения, сразу не узнала…  '*кланяется*'"
];
var ball_fortunes = [
	'Думаю, что не стоит.',
	'Конечно, да.',
	'Определённо нет.',
	'Не знаю.',
	'Да.',
	'Нет.',
	'Возможно.'
];
client.on("message", function(message){


	if(!userData[message.author.id]) userData[message.author.id] = {
		messagesSent: 0
	}
	userData[message.author.id].messagesSent++;
	fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
		if(err) console.error(err);
	});

	const why = client.emojis.find(emoji => emoji.name === "why");

	var args = message.content.substring(PREFIX.length).split(' ');

	if(message.author.bot){
		return;
	};
	if(message)
	//if(!message.mentions.users.first()){ Сейчас не используется.
	//	return;
	//}
	//if(message.isMentioned('421897976215240705')){
	//	return;
	//}
	if(message.isMentioned('421897976215240705') && message.author.id == '265466662550110209'){       
		message.reply(client.emojis.find(emoji => emoji.name === "why"))
	}	

	if(message.isMentioned('421897976215240705') && message.author.id == '265910459138441217' && !message.author.id.startsWith('265466662550110209') && !message.author.id.startsWith('259010721986248705')){
		message.reply(qq_fortunes[Math.floor(Math.random() * qq_fortunes.length)])
	}

	switch (args[0].toLowerCase()) {
		case 'шар':
		if (args[1]) {
			message.reply(ball_fortunes[Math.floor(Math.random() * ball_fortunes.length)]);
		}	else {
			message.reply('Не могли бы повторить ваш запрос? Ведь правильно использовать эту команду надо так: `!шар подписываться ли мне на Нирю?`')
		};
		break
		case 'stats':
		if (args[0]) {
			message.channel.send('```xl' + '\nID: ' + '"' + message.author.id + '"' + '\nНикнейм: ' + '"' + message.author.username + '"' + '\nЗарегистрирован: ' + '"' + message.author.createdAt.toDateString() + '"' + '\nОтправлено сообщений: ' + '"' + userData[message.author.id].messagesSent + '"'  + '\n' + '\nОтправлено:  ' + message.createdAt + '```' );
		};	
	}


})
client.on('ready', () => {
	console.log('Готова к бою! :3');
});
client.on('message', msg => {
	if(msg.content === 'test'){
		msg.reply('Живая!');
	}
});
client.login(token);
