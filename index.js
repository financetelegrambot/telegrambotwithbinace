const express = require('express');
const cors = require('cors'); // cors k�t�phanesi import edilir.
const bodyParser = require('body-parser');
const app = express();
const Binance = require('binance-api-node').default

const TelegramBot = require('node-telegram-bot-api');
let dongu = 0
let donguu = 0



const client = Binance({

  
})

const bot = new TelegramBot( {polling: true});
const bot2 = new TelegramBot( {polling: true});





 

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
 let btcvolume =10000000000
const getdatatotalbtc = async () => {
  try {
    const newData= await client.trades({ symbol: 'BTCUSDT' })
    client.dailyStats({ symbol: 'BTCUSDT' }).then(stats => {
      btcvolume=stats.volume
    });
    
  
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
    if(totalbtc > btcvolume* 0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebtc)
      lasttimebtc = now
      let message = `Parity : BTCUSDT  \nAmount : ${Math.abs(totalbtc)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastbtcprice}`
      lastbtcprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbtc= 0


    }
    if(totalbtc < btcvolume* -0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebtc)
      lasttimebtc = now
      let message = `Parity : BTCUSDT  \nAmount : ${Math.abs(totalbtc)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastbtcprice}`
      lastbtcprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbtc= 0


    }

   console.log(`${totalbtc} btc`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimeeth = new Date()
let lastethprice = 0 
let ethvolume = 100000000000000000000000
const getdatatotaleth = async () => {
  try {
    const newData= await client.trades({ symbol: 'ETHUSDT' })
    client.dailyStats({ symbol: 'ETHUSDT' }).then(stats => {
      ethvolume=stats.volume
    });
  
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
    if(totaleth > ethvolume* 0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeeth)
      lasttimeeth = now
      let message = `Parity : ETHUSDT  \nAmount : ${Math.abs(totaleth)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastethprice}`
      lastethprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totaleth= 0


    }
    if(totaleth < ethvolume * -0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeeth)
      lasttimeeth = now
      let message = `Parity : ETHUSDT  \nAmount : ${Math.abs(totaleth)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastethprice}`
      lastethprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totaleth= 0


    }

   console.log(`${totaleth} eth`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimebnb = new Date()
let lastbnbprice = 0
let bnbvolume = 1000000000000000000000000
const getdatatotalbnb = async () => {
  try {
    const newData= await client.trades({ symbol: 'BNBUSDT' })
    client.dailyStats({ symbol: 'BNBUSDT' }).then(stats => {
      bnbvolume=stats.volume
    });
  
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
    if(totalbnb > bnbvolume * 0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebnb)
      lasttimebnb = now
      let message = `Parity : BNBUSDT  \nAmount : ${Math.abs(totalbnb)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastbnbprice}`
      lastbnbprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbnb= 0


    }
    if( totalbnb < bnbvolume* -0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimebnb)
      lasttimebnb = now
      let message = `Parity : BNBUSDT  \nAmount : ${Math.abs(totalbnb)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastbnbprice}`
      lastbnbprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalbnb= 0


    }

   console.log( `${totalbnb} bnb`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimeont = new Date()
let lastontprice = 0 
let ontvolume =100000000000000000000000000000
const getdatatotalont = async () => {
  try {
    const newData= await client.trades({ symbol: 'ONTUSDT' })
    client.dailyStats({ symbol: 'ONTUSDT' }).then(stats => {
      ontvolume=stats.volume
    });
  
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
    if(totalont > ontvolume *0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeont)
      lasttimeont = now
      let message = `Parity : ONTUSDT  \nAmount : ${Math.abs(totalont)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastontprice}`
      lastontprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalont= 0


    }
    if( totalont < ontvolume * -0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimeont)
      lasttimeont = now
      let message = `Parity : ONTUSDT  \nAmount : ${Math.abs(totalont)} \nSELLING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastontprice}`
      lastontprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalont= 0

    }

   console.log( `${totalont} ont`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}
let lasttimesol = new Date()
let lastsolprice = 0
let solvolume = 10000000000000000000000
const getdatatotalsol = async () => {
  try {
    const newData= await client.trades({ symbol: 'SOLUSDT' })
    client.dailyStats({ symbol: 'SOLUSDT' }).then(stats => {
      solvolume=stats.volume
    });
    
  
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
    if(totalsol > solvolume * 0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimesol)
      lasttimesol = now
      let message = `Parity : SOLUSDT  \nAmount : ${Math.abs(totalsol)} \nBUYING   \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastsolprice}`
      lastsolprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalsol= 0


    }
    if( totalsol < solvolume* -0.01){
      var now = new Date();
      let fark =zamanFarki(now,lasttimesol)
      lasttimesol = now
      let message = `Parity : SOLUSDT  \nAmount : ${Math.abs(totalsol)} \nSELLING  \nSPOT \nPRICE : ${newData[0].price}  \nLAST ALERT : ${fark} ago  \nPREVIUS PRICE:${lastsolprice}`
      lastsolprice = newData[0].price
      bot.sendMessage(-1001632592623, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      bot2.sendMessage(-1001643324636, message)
      .then(() => {
        
      })
      .catch((error) => {
        console.error(error);
      });
      totalsol= 0


    }

   console.log(`${totalsol} sol`)
  } catch (error) {
    console.error('Hata olu_tu:', error);

    // Balant1 kesildiinde, 5 saniye sonra tekrar deneyin
    setTimeout(getdata, 5000);
  }

 
  
}







 
// bot.getChat('@pintigrup')


setInterval(getdatatotalbtc, 1500);
setInterval(getdatatotaleth, 10000);
setInterval( getdatatotalbnb ,30000);
setInterval( getdatatotalont ,60000);
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








// CORS hatas1n1 ��zmek i�in, t�m kaynaklardan gelen isteklere izin vermek i�in cors() fonksiyonu kullan1l1r.




