require('dotenv').config();
const Twit = require('twit');
let maxAnsPer5min = 10; // Pour avoir maximum 10 réponses toutes les 5 minutes
let curAns = 0; // Nombre de réponses pour le moment

const T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
});

setInterval(() => { // Executer cette fonction :
    curAns = 0
}, 5 * 60 * 1000) // Toutes les 5 * 60 * 1000 milisecondes (5 minutes)

const motsDeChomeur = [
    "Ssi",
    "Feuse",
    "Feur",
    "Fure",
    "Chi",
    "Drado",
    "Resma",
    "Feuse",
    "Driceps",
    "Drilatère",
    "Drado",
    "D",
    "Drupède",
    "Tuor",
    "Druplé",
    "De neuf",
    "Ffage",
    "Artz",
    "La",
    "La Lumpur",
    "Terback",
    "Dragénaire",
    "Drilataire",
    "Druple",
    "Dricolore",
    "Ker",
    "Gliarella",
    "Tuor",
    "Dalajara",
    "Ffé",
    "Ncer",
    "Dri",
    "Drillion",
    "Drillage",
    "Drisyllabe",
    "Drillion",
    "Rteron",
    "Drireacteur",
    "Sar",
    "Que",
    "Rtet",
];

const stream = T.stream("statuses/filter", {track: "quoi"}); // feur
stream.on('tweet',(tweet)=>{
    const {text, user, id_str} = tweet;
    const {screen_name} = user;
    if(text.match(/quoi ?\??$/)) {
        if (tweet.retweeted_status) return;
        if(curAns == maxAnsPer5min) return;
        console.log(screen_name+" tweeted: "+text+" - is a retweet:",tweet.retweeted_status?"yes":"no");
        T.post("statuses/update", {in_reply_to_status_id: id_str, status: `@${screen_name} ${motsDeChomeur[Math.floor(Math.random()*(motsDeChomeur.length-1))]}`},(err,data) => {
            curAns++;
            if (err) console.error("Err:",err);
            console.log("Tweet posté: https://twitter.com/botquoi_koro/status/"+data.id_str);
        });
    }
});

