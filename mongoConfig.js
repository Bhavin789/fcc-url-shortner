var mongoose = require('mongoose');
const shortid = require("shortid");

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

require('dotenv').config();

const { Schema, model } = mongoose;

const urlSchema = new Schema({
  longUrl: { type: String, required: true, unique : true },
  shortUrl: { type: String, required: true },
});

let Url = new model("Url", urlSchema);

const addNewUrl = (longUrl, done) => {
  return Url.create({ longUrl, shortUrl: shortid.generate() }).then((res) => {
    done(null, res)
  }).catch(err => {
    done(err)
  })
}

exports.UrlModel = Url;
exports.addNewUrl = addNewUrl;

