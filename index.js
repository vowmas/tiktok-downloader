var Telegram = require('node-telegram-bot-api');
var request = require("request");
var token = '7823908861:AAF5cZqoUifZQx7IPh-1d4-KOx2Z0-a0_BY';

// Configure the bot to use polling
var opt = {
  polling: true
};

var bot = new Telegram(token, opt);

// Event listener for receiving messages
bot.on("message", function(msg) {
  var text = msg.text;

  if (text == '/start') {
    // Send a welcome message
    bot.sendMessage(msg.chat.id, "👋 Hi, I am a bot for downloading TikTok videos without watermark.");
    
    // Delay for 500ms and then send another message
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(500).then(() => bot.sendMessage(msg.chat.id, "✨ Please send the video link"));
  } else if (text.includes('tiktok.com')) {
    // Acknowledge receipt of the TikTok link
    bot.sendMessage(msg.chat.id, "⏳Please wait...");

    // Request the video from the TikTok API
    var reqvideourl = "https://www.tikwm.com/api/?url=" + text + "&hd=1";
    request(reqvideourl, function(error, response, body) {
      var json = JSON.parse(body);

      // Check if the video data is available
      if (json.data == undefined) {
        bot.sendMessage(msg.chat.id, "😔 Sorry, I can't download this video right now. Please try again later.");
      } else {
        // Delay for 500ms and then send the video
        function delay(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }

        delay(500).then(() => bot.sendVideo(msg.chat.id, json.data.hdplay));
      }
    });
  } else {
    // Prompt the user to send a valid link
    bot.sendMessage(msg.chat.id, "🧐 Please send a valid video link");
  }
});
