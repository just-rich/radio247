require('dotenv').config();

const path = require('path');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () =>
{
    console.log(client.user.tag);
});

client.on('message', async(message) =>
{
    const split_msg = message.content.split(' ');
    const command = split_msg.slice(0, 1)[0];
    const args = split_msg.slice(1);

    if(message.author.bot)
    {
        return;
    }
    
    try
    {
        if(command == 'r-' + 'play')
        {
            const voiceChannel = await client.channels.fetch(process.env.VC);

            await voiceChannel.join().then((connection) => 
                {
                    console.log(__dirname + '\\music.mp3');
                    const dispatcher = connection.play(args[0]);
                    
                    dispatcher.on("end", (end) =>
                    {
                        voiceChannel.leave();
                    });
                }).catch(err => console.log(err));
        }
    }
    catch(error)
    {
        console.log(error);
        message.channel.send('Internal error, check logs for more info.');
    }
});

client.login(process.env.TOKEN);