
const { Client } = require('discord.js');
const yt = require('ytdl-core');
const tokens = require('./tokens.json');
const client = new Client();
const PREFIX = '!';
const fs = require('fs');

let queue = {};

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));


var qq_fortunes = [
	'Постойте-ка, неужели меня пинганул **тот самый** ЧСВ? Не смей больше так делать, разговаривать с тобой не приносит никого удовольствия.',
	'Да как ты посмел, ЧСВ?'
];

var w85ey_fortunes = [
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

const bot = '421897976215240705';

var user = '421897976215240705';






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


const commands = {
	'play': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Сначала добавьте песни в очередь с помощью команды ${tokens.prefix}add`);
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
		if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Музыка уже проигрывается.');
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.sendMessage('Плейлист с песнями пуст, добавьте новые!').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			
			msg.channel.sendMessage(`Проигрывается песня: **${song.title}** заказанная: **${song.requester}**`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : tokens.passes });
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(tokens.prefix + 'pause')) {
					msg.channel.sendMessage('Приостановлено.').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(tokens.prefix + 'resume')){
					msg.channel.sendMessage('Продолжено.').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(tokens.prefix + 'skip')){
					msg.channel.sendMessage('Пропущенно.').then(() => {dispatcher.end();});
				} else if (m.content.startsWith('volume+')){
					if (Math.round(dispatcher.volume*20) >= 100) return msg.channel.sendMessage(`Громкость: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (5*(m.content.split('+').length-1)))/50,2));
					msg.channel.sendMessage(`Громкость: ${Math.round(dispatcher.volume*20)}%`);
				} else if (m.content.startsWith('volume-')){
					if (Math.round(dispatcher.volume*20) <= 0) return msg.channel.sendMessage(`Громкость: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (5*(m.content.split('-').length-1)))/50,0));
					msg.channel.sendMessage(`Громкость: ${Math.round(dispatcher.volume*20)}%`);
				} else if (m.content.startsWith(tokens.prefix + 'time')){
					msg.channel.sendMessage(`Время: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.sendMessage('Ошибка: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift());
	},
	'join': (msg) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('Я не могу присоединиться к голосовому каналу...');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	},
	'add': (msg) => {
		let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) return msg.channel.sendMessage(`Вы должны добавить Ютуб ссылку после команды ${tokens.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage('Неправильная Ютуб ссылка: ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.sendMessage(`Песня **${info.title}** добавлена в очередь.`);
		});
	},
	'queue': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Сначала добавьте несколько песен в очередь с помощью команды ${tokens.prefix}add`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Заказана: ${song.requester}`);});
		msg.channel.sendMessage(`__**${msg.guild.name} Музыка:**__ Сейчас **${tosend.length}** песни добавлены в очередь ${(tosend.length > 15 ? '*[Показываются только последние 15 песен]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	},
	'help': (msg) => {
		let tosend = ['```xl', tokens.prefix + 'join : "Присоединяется к голосовому каналу. (Вам нужно быть в голосовом канале, чтобы бот смог зайти)"',	tokens.prefix + 'add : "Добавляет песню в очередь."', tokens.prefix + 'queue : "Показывает очередь. Только до первых 15 песен."', tokens.prefix + 'play : "Начинает проигрывать музыку, если присоединён к голосовому каналу."', '', 'Следующие команды доступно только при условии, что бот находится в голосовом канале:'.toUpperCase(), tokens.prefix + 'pause : "Приостанавливает музыку."',	tokens.prefix + 'resume : "Продолжает воспроизведение музыки."', tokens.prefix + 'skip : "Пропускает текущую песню."', tokens.prefix + 'time : "Показывает длительность песни. (даже не знаю, зачем я это добавил, но поэксперементировать с кодом захотелось попробовать)"',	'volume+(+++) : "Увеличивает громкость на 5%/+"',	'volume-(---) : "Понижает громкость на 5%/-"',	'```'];
		msg.channel.sendMessage(tosend.join('\n'));
	},
	'reboot': (msg) => {
		if (msg.author.id == tokens.adminID) process.exit(); //Requires a node module like Forever to work.
	},
	'leave' : (msg) => {
		msg.member.voiceChannel.leave();}
};

client.on('ready', () => {
	console.log('Готова к бою! :3');
});

client.on('message', msg => {
	if(msg.content === 'test'){
		msg.reply('Живая!');
	}
	if (!msg.content.startsWith(tokens.prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]](msg);
});
client.login(tokens.d_token);
