require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();

const bodyParser = require('body-parser');

let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

app.get("/is-mongoose-ok", function (req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

const addNewUrl = require("./mongoConfig.js").addNewUrl;

app.get("/api/shorturl", (req, res) => {
  dns.lookup('example.com', (err, address, family) => {
    if (err !== null) {
      return res.json({ error: 'invalid url' });
    }
    /**
     * if the url is correct, save it to the db with a random * short uri
     */
    addNewUrl('example.com', (err, response) => {
      if (err !== null) {
        return res.json({ error: 'unable to insert to the db' });
      }
      return res.json({ original_url: response.longUrl, short_url: response.shortUrl });
    })
  }
  );
})

app.get("/api/shorturl/:url", (req, res) => {
  const url = req.params.url;
  res.redirect("http://example.com");
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
