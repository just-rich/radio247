require('dotenv').config();

const path = require('path');
const Discord = require('discord.js');


const bots = [
    {
        token: process.env.TOKEN_1,
        voice: process.env.VC_1,
        prefix: process.env.PREFIX_1,
        status: process.env.STATUS_1,
        roles: process.env.ROLE_1,
    }, 
    {
        token: process.env.TOKEN_2,
        voice: process.env.VC_2,
        prefix: process.env.PREFIX_2,
        status: process.env.STATUS_2,
        roles: process.env.ROLE_2,
    }, 
    {
        token:process.env.TOKEN_3,
        voice: process.env.VC_3,
        prefix: process.env.PREFIX_3,
        status: process.env.STATUS_3,
        roles: process.env.ROLE_3,
    }];
    
bots.forEach((bot) => 
{
    const client = new Discord.Client();
    
    client.on('ready', () =>
    {
        client.user.setActivity("Listening to " + bot.status, {
            type: "STREAMING"
        });

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
            const roles_arr = bot.roles.split(',');
            roles_arr.forEach(async(rol) =>
            {
                if(message.member.roles.cache.has(rol))
                {
                    if(command == bot.prefix + 'play')
                    {
                        const voiceChannel = await client.channels.fetch(bot.voice);
    
                        await voiceChannel.join().then((connection) => 
                            {
                                const dispatcher = connection.play(args[0]);
                                
                                dispatcher.on("end", (end) =>
                                {
                                    voiceChannel.leave();
                                });
                            }).catch(err => console.log(err));
                    }

                    return;
                }
            });
        }
        catch(error)
        {
            console.log(error);
            message.channel.send('Internal error, check logs for more info.');
        }
    });
    
    client.login(bot.token);
});
