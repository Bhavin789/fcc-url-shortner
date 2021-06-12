require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/shorturl", (req, res) => {
  dns.lookup('example.com', (err, address, family) => {
    if(err !== null){
      return res.json({ error: 'invalid url' });
    }
    /**
     * if the url is correct, save it to the db with a random * number
     */
    console.log('address: %j family: IPv%s', address, family)
    res.json({ success: true });
  }
  );
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
