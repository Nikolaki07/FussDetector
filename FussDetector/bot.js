const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Words to detect (case-insensitive)
const targetWords = ['füssen', 'fuss', 'fuß', 'foot'];
const larsonWords = ['kyle larson', 'larson'];
const franceWords = ['france', '🇫🇷', 'french'];

// Event: Bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Message received
client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Convert message to lowercase for case-insensitive comparison
  const lowerContent = message.content.toLowerCase();

  // Check if message contains any target words
  const containsTargetWord = targetWords.some(word => 
    lowerContent.includes(word)
  );

  // Check if message contains Kyle Larson
  const containsKyleLarson = larsonWords.some(word => 
    lowerContent.includes(word)
  );

  // Check if message contains France
  const containsFrance = franceWords.some(word => 
    lowerContent.includes(word)
  );

  // Add reaction if target word found
  if (containsTargetWord) {
    try {
      await message.react('🤤');
    } catch (error) {
      console.error('Failed to react:', error);
    }
  }

  // Kyle Larson detection with countdown and deletion
  if (containsKyleLarson) {
    try {
      // Send the countdown message
      const countdownMsg = await message.channel.send('KYLE LARSON DETECTED! MESSAGE GETS DELETED IN 5...');
      
      // Countdown from 5 to 1
      for (let i = 4; i >= 1; i--) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        await countdownMsg.edit(`KYLE LARSON DETECTED! MESSAGE GETS DELETED IN ${i}...`);
      }
      
      // Wait 1 more second before deleting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete both messages
      await message.delete();
      await countdownMsg.delete();
    } catch (error) {
      console.error('Failed to delete messages:', error);
    }
  }

  // France detection with countdown and deletion
  if (containsFrance) {
    try {
      // Send the countdown message
      const countdownMsg = await message.channel.send('FR*NCE DETECTED! PLEASE NEXT TIME CENSOR THE F WORD. MESSAGE DELETED IN 5...');
      
      // Countdown from 5 to 1
      for (let i = 4; i >= 1; i--) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        await countdownMsg.edit(`FR*NCE DETECTED! PLEASE NEXT TIME CENSOR THE F WORD. MESSAGE DELETED IN ${i}...`);
      }
      
      // Wait 1 more second before deleting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete both messages
      await message.delete();
      await countdownMsg.delete();
    } catch (error) {
      console.error('Failed to delete messages:', error);
    }
  }
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);