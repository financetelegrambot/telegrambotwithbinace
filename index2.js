const express = require('express');
const cors = require('cors'); // cors k�t�phanesi import edilir.
const bodyParser = require('body-parser');
const app = express();
const Binance = require('binance-api-node').default

const TelegramBot = require('node-telegram-bot-api');
let dongu = 0
let donguu = 0
const token = '6025824282:AAHjolmo_ToYNgXRzOQmOOcz6xgbvflJ00g';


const client = Binance({
  apiKey: 'LFyaWtrQ23WE1JOTVfVxO0VqNAeqhcoPaTTHXCI5vtO1VktQcQD7hOdL7aJXJibE',
  apiSecret: 'IQH9TS4Qhxidp5qpE3apT2ygPqOVemotNhoQu6EyUyA4G8NOEQcwBkVbgNdf1HhY',
  getTime: Date.now(),
  
})

const bot = new TelegramBot(token, {polling: true});



let previousData =[];
let previousDatafutures =[];
let previousDatadydx =[];





const getdataspotbtc = async () => {
  try {
    const newData= await client.trades({ symbol: 'BTCUSDT' })
   
    console.log(dongu)
    dongu = dongu + 1
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousData.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      if (!previousData.includes(item.id)) {
        if(item.qty > 15){
          let isbuying = null
          if(item.isBuyerMaker){
            isbuying = "SELLING!!!!4"
          }else{
            isbuying = "BUYING!!!!�"
          }
          let message = `Parity : BTCUSDT  \nAmount : ${item.qty}  ${isbuying}  \nSPOT \n price : ${item.price}`
          bot.sendMessage(-1001632592623, message)
          .then(() => {
            
          })
          .catch((error) => {
            console.error(error);
          });
        
        }
      }
      else {
        console.log(" birinci veri setinde yer aliyor");
      }
    }

    

    previousData = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });

  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
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
const getdatafuturesbtc = async () => {
  try {
    const newData= await client.futuresTrades({ symbol: 'BTCUSDT' })
    console.log("yenireqatildifutures ")
    console.log(donguu)
    donguu = donguu + 1
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousDatafutures.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      if (!previousData.includes(item.id)) {
        if(item.qty > 15){
          let isbuying = null
          if(item.isBuyerMaker){
            isbuying = "SELLING!!!!4"
          }else{
            isbuying = "BUYING!!!!�"
          }
          let message = `parity : BTCUSDT  amount : ${item.qty}  ${isbuying}  futures `
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

    

    previousDatafutures = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });

  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
const getdataspotdydx = async () => {
  try {
    const newData= await client.trades({ symbol: 'DYDXUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousDatadydx.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      if (!previousData.includes(item.id)) {
        if(item.qty > 50000){
          let isbuying = null
          if(item.isBuyerMaker){
            isbuying = "SELLING!!!!4"
          }else{
            isbuying = "BUYING!!!!�"
          }
          let message = `Parity : DYDXUSDT  \nAmount : ${item.qty}  ${isbuying} \nSPOT \nPrice : ${item.price}`
          bot.sendMessage(-1001632592623, message)
          .then(() => {
            
          })
          .catch((error) => {
            console.error(error);
          });
          
        }
      }
      else {
        
      }
    }

    

    previousDatadydx = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });

  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let previousDataeth = []
const getdataspoteth = async () => {
  try {
    const newData= await client.trades({ symbol: 'ETHUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousDataeth.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      if (!previousData.includes(item.id)) {
        if(item.qty > 50){
          let isbuying = null
          if(item.isBuyerMaker){
            isbuying = "SELLING!!!!4"
          }else{
            isbuying = "BUYING!!!!�"
          }
          let message = `Parity : ETHUSDT  \nAmount : ${item.qty}  ${isbuying} \nSPOT \nPrice : ${item.price}`
          bot.sendMessage(-1001632592623, message)
          .then(() => {
            
          })
          .catch((error) => {
            console.error(error);
          });
          
        }
      }
      else {
        
      }
    }


    

    previousDataeth = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });

  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}

function zamanFarki(suan, once) {
  let fark = Math.abs(suan.getTime() - once.getTime());
  let gun = Math.floor(fark / (1000 * 60 * 60 * 24));
  fark -= gun * 1000 * 60 * 60 * 24;
  let saat = Math.floor(fark / (1000 * 60 * 60));
  fark -= saat * 1000 * 60 * 60;
  let dakika = Math.floor(fark / (1000 * 60));
  fark -= dakika * 1000 * 60;
  let saniye = Math.floor(fark / 1000);

  if (gun === 0 && saat === 0) {
    return `${dakika} minute ${saniye} second`;
  } else if (gun === 0) {
    return `${saat} hour ${dakika} minute ${saniye} second`;
  } else {
    return `${gun} day ${saat} hour ${dakika} minute ${saniye} second`;
  }
}
let previousbtc =[];
let totalbtc =0;
let previouseth =[];
let totaleth =0;
let previousbnb =[];
let totalbnb =0;
let previousont =[];
let totalont =0;
let previoussol =[];
let totalsol =0;
let lasttimebtc = new Date()
 let lastbtcprice = 0
const getdatatotalbtc = async () => {
  try {
    const newData= await client.trades({ symbol: 'LTCUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousbtc.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      
         
          if(item.isBuyerMaker){
          
            totalbtc = totalbtc - parseFloat(item.qty)
          }else{
           
            totalbtc= totalbtc + parseFloat(item.qty)
          }
          // let message = `parity : DYDXUSDT  amount : ${item.qty}  ${isbuying}  spot price : ${item.price}`
          // bot.sendMessage(-1001632592623, message)
          // .then(() => {
            
          // })
          // .catch((error) => {
          //   console.error(error);
          // });
          
        
     
    }

    

   previousbtc = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });
    if(totalbtc > 10000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebtc)
      lasttimebtc = now
      let message = `Parity : LTCUSDT  \nAmount : ${Math.abs(totalbtc)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastbtcprice}`
      lastbtcprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbtc= 0


    }
    if(totalbtc < -10000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebtc)
      lasttimebtc = now
      let message = `Parity : LTCUSDT  \nAmount : ${Math.abs(totalbtc)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastbtcprice}`
      lastbtcprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbtc= 0


    }

   console.log(`${totalbtc} LTC`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimeeth = new Date()
let lastethprice = 0 
const getdatatotaleth = async () => {
  try {
    const newData= await client.trades({ symbol: 'XRPUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previouseth.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      
          let isbuying = null
          if(item.isBuyerMaker){
          
            totaleth = totaleth - parseFloat(item.qty)
          }else{
           
            totaleth = totaleth + parseFloat(item.qty)
          }
          // let message = `parity : DYDXUSDT  amount : ${item.qty}  ${isbuying}  spot price : ${item.price}`
          // bot.sendMessage(-1001632592623, message)
          // .then(() => {
            
          // })
          // .catch((error) => {
          //   console.error(error);
          // });
          
        
     
    }

    

   previouseth = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });
    if(totaleth > 2500000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeeth)
      lasttimeeth = now
      let message = `Parity : XRPUSDT  \nAmount : ${Math.abs(totaleth)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastethprice}`
      lastethprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totaleth= 0


    }
    if(totaleth < -2500000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeeth)
      lasttimeeth = now
      let message = `Parity : XRPUSDT  \nAmount : ${Math.abs(totaleth)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastethprice}`
      lastethprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totaleth= 0


    }

   console.log(`${totaleth} XRP`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimebnb = new Date()
let lastbnbprice = 0
const getdatatotalbnb = async () => {
  try {
    const newData= await client.trades({ symbol: 'TRXUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousbnb.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      
          let isbuying = null
          if(item.isBuyerMaker){
          
            totalbnb =  totalbnb - parseFloat(item.qty)
          }else{
           
            totalbnb =  totalbnb + parseFloat(item.qty)
          }
          // let message = `parity : DYDXUSDT  amount : ${item.qty}  ${isbuying}  spot price : ${item.price}`
          // bot.sendMessage(-1001632592623, message)
          // .then(() => {
            
          // })
          // .catch((error) => {
          //   console.error(error);
          // });
          
        
     
    }

    

   previousbnb = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });
    if(totalbnb > 10000000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebnb)
      lasttimebnb = now
      let message = `Parity : TRXUSDT  \nAmount : ${Math.abs(totalbnb)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastbnbprice}`
      lastbnbprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbnb= 0


    }
    if( totalbnb < -10000000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebnb)
      lasttimebnb = now
      let message = `Parity : TRXUSDT  \nAmount : ${Math.abs(totalbnb)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastbnbprice}`
      lastbnbprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbnb= 0


    }

   console.log( `${totalbnb} TRX`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimeont = new Date()
let lastontprice = 0 
const getdatatotalont = async () => {
  try {
    const newData= await client.trades({ symbol: 'DOGEUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previousont.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      
          let isbuying = null
          if(item.isBuyerMaker){
          
            totalont =  totalont - parseFloat(item.qty)
          }else{
           
            totalont =  totalont + parseFloat(item.qty)
          }
          // let message = `parity : DYDXUSDT  amount : ${item.qty}  ${isbuying}  spot price : ${item.price}`
          // bot.sendMessage(-1001632592623, message)
          // .then(() => {
            
          // })
          // .catch((error) => {
          //   console.error(error);
          // });
          
        
     
    }

    

   previousont = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });
    if(totalont > 8000000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeont)
      lasttimeont = now
      let message = `Parity : DOGEUSDT  \nAmount : ${Math.abs(totalont)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastontprice}`
      lastontprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalont= 0


    }
    if( totalont < -8000000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeont)
      lasttimeont = now
      let message = `Parity : DOGEUSDT  \nAmount : ${Math.abs(totalont)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastontprice}`
      lastontprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalont= 0

    }

   console.log( `${totalont} DOGE`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimesol = new Date()
let lastsolprice = 0
const getdatatotalsol = async () => {
  try {
    const newData= await client.trades({ symbol: 'MATICUSDT' })
    
  
    // const filtereddata = newData.filter(item => !previousData.includes(item))
    const filtereddata= newData.filter(item => !previoussol.find(({ id }) => id === item.id));

    for (let i = 0; i < filtereddata.length; i++) {
      let item = filtereddata[i];

      
          let isbuying = null
          if(item.isBuyerMaker){
          
            totalsol =  totalsol - parseFloat(item.qty)
          }else{
           
            totalsol =  totalsol + parseFloat(item.qty)
          }
          // let message = `parity : DYDXUSDT  amount : ${item.qty}  ${isbuying}  spot price : ${item.price}`
          // bot.sendMessage(-1001632592623, message)
          // .then(() => {
            
          // })
          // .catch((error) => {
          //   console.error(error);
          // });
          
        
     
    }

    

   previoussol = newData
    // const myJSON = JSON.stringify(newData);
    // const filePath = path.join(__dirname, 'data.json');
      
    //   fs.writeFile(filePath, myJSON, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('JSON data has been saved to', filePath);
    //   });
    if(totalsol > 500000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimesol)
      lasttimesol = now
      let message = `Parity : MATICUSDT  \nAmount : ${Math.abs(totalsol)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastsolprice}`
      lastsolprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalsol= 0


    }
    if( totalsol < -500000){
      var now = new Date();
      let fark =zamanFarki(now,lasttimesol)
      lasttimesol = now
      let message = `Parity : MATICUSDT  \nAmount : ${Math.abs(totalsol)} \nSELLING  \nSPOT \nPRICE : ${newData[0].price}  \nlast alert : ${fark} ago  \nPREVIUS PRICE:${lastsolprice}`
      lastsolprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalsol= 0


    }

   console.log(`${totalsol} matic`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}







 
// bot.getChat('@pintigrup')


setInterval(getdatatotalbtc, 60000);
setInterval(getdatatotaleth, 30000);
setInterval( getdatatotalbnb ,90000);
setInterval( getdatatotalont ,15000);
setInterval( getdatatotalsol ,60000);


// setInterval(getdataspoteth, 35000);
// getdataspotbtc()

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


