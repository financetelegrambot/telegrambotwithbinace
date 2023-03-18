const express = require('express');
const cors = require('cors'); // cors kütüphanesi import edilir.
const bodyParser = require('body-parser');
const app = express();
const Binance = require('binance-api-node').default
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
let dongu = 0
const token = '6247571048:AAEcLHl7rPRz1m4nMW4pI93qMmfQZHsN0lo';
const client = Binance({
  apiKey: 'LFyaWtrQ23WE1JOTVfVxO0VqNAeqhcoPaTTHXCI5vtO1VktQcQD7hOdL7aJXJibE',
  apiSecret: 'IQH9TS4Qhxidp5qpE3apT2ygPqOVemotNhoQu6EyUyA4G8NOEQcwBkVbgNdf1HhY',
  getTime: Date.now(),
  
})

const bot = new TelegramBot(token, {polling: true});



let previousData =[];





const getdata = async () => {
  try {
    const newData= await client.trades({ symbol: 'BTCUSDT' })
    console.log("yenireqatildi ")
    console.log(dongu)
    dongu = dongu + 1
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousData.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      if (!previousData.includes(item.id)) {
        if(item.qty > 1.5){
          let isbuying = null
          if(item.isBuyerMaker){
            isbuying = "SELLING!!!!"
          }else{
            isbuying = "BUYING!!!!"
          }
          let message = `parity : BTCUSDT  amount : ${item.qty}  ${isbuying}  `
          bot.sendMessage(-1001632592623, message)
          .then(() => {
            
          })
          .catch((error) => {
            console.error(error);
          });
          console.log(item)
        }
      }
      else {
        console.log(" birinci veri setinde yer aliyor");
      }
    }

    

    previousData = newData

  } catch (error) {
    console.error('Hata oluştu:', error);

    // Bağlantı kesildiğinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }
  
  // fs.writeFile(filePath, myJSON, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log('JSON data has been saved to', filePath);
  // });
  
}




 
// bot.getChat('@pintigrup')


setInterval(getdata, 1500);
function sendMessage(chatId, message) {
  bot.sendMessage(chatId, message)
    .then(() => {
      console.log(`Message sent to ${chatId}`);
    })
    .catch((error) => {
      console.error(error);
    });
}




bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome");
  console.log(msg.chat.id);
  
  });

client.time().then(time => console.log(time))

// const filePath = path.join(__dirname, 'data.json');






// CORS hatasını çözmek için, tüm kaynaklardan gelen isteklere izin vermek için cors() fonksiyonu kullanılır.
app.use(cors());
app.use(bodyParser.json());
let string= null
app.get('/api/mesaj', (req, res) => {
  
  
  const mesaj = {
    message: veriler
  };
  res.json(veriler);
});



app.post('/api/string', (req, res) => {
    string = req.body.string;
    res.send(`Gönderilen string: ${string}`);
});

app.listen(3000, () => {
  console.log('Sunucu çalisiyor...');
});