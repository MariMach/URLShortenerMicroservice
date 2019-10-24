// Basic requires imports for NodeJs App
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // for cross-orign requests
const mongoose = require("mongoose");

const ShortUrl = require('./models/shortUrl');

// Create an instance of all the imports
const app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
// Allows node to find static content
app.use(express.static( __dirname + '/public'));


// connect to mongodb
// mongoose.connect(process.env.MONGOLAB_URI);
const dbstring = process.env.MONGOLAB_URI || "mongodb://localhost/shortUrls";

mongoose.connect(dbstring, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connected to MongoDB 😍😍😍... ${dbstring}`) )
    .catch(() => console.log(`Could not Connect to MongoDB ... ${dbstring}`) );

app.get('/api/shorturl/new/:original_url(*)', async (req, res, next) => {
    // ES5 var original_url = req.params.original_url
    // dns.lookup(original_url, (err, address) => {
    //     if (err) {
    //         console.log(err.stack);
    //     } else {
    //         console.log('address:', address);
    //         console.log(original_url);
    //     }
    // });

    /*
    Following is the query to get last inserted document 
    db.getLastInsertedDocument.find({}).sort({_id:-1}).limit(1);
    */
    
    const count = await ShortUrl.find().count(function (err, count) {
        if (err) {
            res.json({ error: "error reading the database" });
        } else {
            return count;
        }
    });

    var { original_url } = req.params // ES6 
    const regexUrl =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    if (regexUrl.test(original_url) === true) {       
                
        const data = new ShortUrl({
            original_url: original_url,
            short_url: count + 1
        });

        await data.save();
        res.json(data);

    } else {
        res.json({ error: "invalid URL" });
    }
});



app.get('/api/shorturl/:short_url', async (req, res, next) => {
    var short_urlvar = req.params.short_url;
    await ShortUrl.findOne({ short_url: short_urlvar}, (err, data) => {
        if(err) {
            res.json({error: "error reading the database"});
        } else {
            var re = new RegExp("^(http|https)://", "i");
            var strTocheck = data.original_url;
            if(re.test(strTocheck)) {
                res.redirect(301, data.original_url);
            } else {
                res.redirect(301, 'http://' + data.original_url);
            }
        }
    });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});


app.use(function (err, req, res, next) {
    return res.status(500).send('Something failed ........................................................................');
});

// the last thing to do
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


