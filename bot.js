const Twit = require('twit');
const fetch = require('node-fetch');
const schedule = require('node-schedule');

console.log('The bot is starting');

const tokens = require('./tokens');
var T = new Twit(tokens);

function tweetIt(txt) {
    
    let tweet = { 
        status: txt
    };
    
    function tweeted(err, data, response) {
        if (err) {
            console.log(err);
        } else { 
            console.log('It worked');
        }
    }
    
    
    T.post('statuses/update', tweet, tweeted); 
}

async function chuckNorrisJoke() {
    try {
        const URL = 'https://api.chucknorris.io/jokes/random';
        const response = await fetch(URL);
        const json = await response.json();
        tweetIt(`${json.value}  #chucknorris #I${Math.floor(Math.random() * 100000)}`);
    } catch (err) {
        console.log(err);
    }
}

async function randomFacts() {
    try {
        const URL = 'http://randomuselessfact.appspot.com/random.json?language=en';
        const response = await fetch(URL);
        const json = await response.json();
        tweetIt(`${json.text}  #facts #I${Math.floor(Math.random() * 100000)}`);
    } catch (err) {
        console.log(err);
    }
}

async function getTyrnavosW(){
    try {
        const URL = 'https://api.openweathermap.org/data/2.5/weather?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric';
        const response = await fetch(URL);
        const json = await response.json();
        let tweet = `Current weather in Tyrnavos city, Temp: ${json.main.temp}, desc: ${json.weather[0].description}`;
        tweetIt(tweet);

    } catch (err) {
        console.log(err)
    }
}

async function quoteOday() { 
    try {
        const URL = 'http://quotes.rest/qod.json';
        const response = await fetch(URL);
        const json = await response.json();
        let tweet = `${json.contents.quotes[0].quote}  \n   -${json.contents.quotes[0].author}  #${json.contents.quotes[0].category}`;
        tweetIt(tweet);
    } catch (err) {
        console.log(err);
    }
}


// let s1 = schedule.scheduleJob({minute: 1}, randomFacts);
// let s2 = schedule.scheduleJob('5 0,3,6,9,12,15,18,21 * * *', chuckNorrisJoke);
// let s3 = schedule.scheduleJob('0 15 * * *', quoteOday);
// let s4 = schedule.scheduleJob('30 0,6,12,18 * * *', getTyrnavosW);  // cron-format is better https://crontab.guru/

//setInterval(randomFacts, 10000);

// setInterval(chuckNorrisJoke, 1000);
// setInterval(randomFacts, 1000);
//quoteOday();

tweetIt('lol');