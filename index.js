const Discord = require("discord.js");
 const client = new Discord.Client({ disableMentions: 'everyone' });
const Eco = require("quick.eco");
client.eco = new Eco.Manager();
client.db = Eco.db; 
client.config = require("./botConfig.js");
client.on("message", async message => {
    // Checking if the message author is a bot.
    if (message.author.bot) return false;

    // Creating a filter.
    const Filter = (reaction, user) => user.id == message.author.id;

    // Creating the embed message.
    const Embed = new Discord.MessageEmbed()
        .setTitle(`FrownMC Cloud - Tickets`)
        .setColor("#8F00FF")
        .setDescription(`Open tickets with react 🎟`);
    
    // Awaiting for the embed message to be sent.
    const reactionMessage = await message.channel.send(Embed);

    // Reacting to the embed message.
    await reactionMessage.react("🎟");

    // Awaiting a reaction to the embed message. Time is measured in ms. (30000 ms - 30 seconds)
    reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
        // Getting the first reaction in the collection.
        const reaction = collected.first();
        
        // Creating a switch statement for reaction.emoji.name.
        switch (reaction.emoji.name) {
            case "🎟":
                var server = message.guild;
                var name = message.author.username;
                server.channels.create(name, "text");
                const ChID = Discord.channels.cache.find(channel => channel.name === name);
                client.message.channel.send(ChID).catch(err) { console.log(err) };
                break
        }
    })
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.shop = {
  "Laptop" : {
    cost: 2000
  },
  "Mobile" : {
    cost: 1000
  },
  "PC" : {
    cost: 3000
  }
};
client.anbuy = {
  "Leopard": {
    cost: 230,
    st: ":leopard:"
  },
  "Crocodile" : {
    cost: 190,
    st: ":crocodile:"
  },
  "Tiger" : {
    cost: 210,
    st: ":tiger2:"
  },
  "Unicorn" : {
    cost: 350,
    st: ":unicorn:"
  },
  "Fox" : {
    cost: 170,
    st: ":fox:"
  },
  "Monkey" : {
    cost: 60,
    st: ":monkey:"
  },
  "Penguin" : {
    cost: 130,
    st: ":penguin:"
  },
  "Snake" : {
    cost: 100,
    st: ":snake:"
  },
  "Whale" : {
    cost: 490,
    st: ":whale:"
  },
  "Shark" : {
    cost: 340,
    st: ":shark:"
  },
  "Buffalo" : {
    cost: 140,
    st: ":buffalo:"
  },
  "leopard": {
    cost: 230,
    st: ":leopard:"
  },
  "crocodile" : {
    cost: 190,
    st: ":crocodile:"
  },
  "tiger" : {
    cost: 210,
    st: ":tiger2:"
  },
  "unicorn" : {
    cost: 350,
    st: ":unicorn:"
  },
  "fox" : {
    cost: 170,
    st: ":fox:"
  },
  "monkey" : {
    cost: 60,
    st: ":monkey:"
  },
  "penguin" : {
    cost: 130,
    st: ":penguin:"
  },
  "snake" : {
    cost: 100,
    st: ":snake:"
  },
  "whale" : {
    cost: 490,
    st: ":whale:"
  },
  "shark" : {
    cost: 340,
    st: ":shark:"
  },
  "buffalo" : {
    cost: 140,
    st: ":buffalo:"
  }
};
const fs = require("fs");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.login(process.env.TOKEN);