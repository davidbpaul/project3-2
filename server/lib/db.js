"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

//connecting to server
let db;
MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {
  if (err) {
    console.log('Could not connect! Unexpected error. Details below.');
    throw err;
  }
  console.log(`Successfully connected to DB: ${MONGODB_URI}`);
  db = mongoInstance;
});
//posting and getting tweets
const dbMethods = {

  saveTweet: (data) => {
    db.collection("tweets").insertOne(data, (err, results) => {
      if(err){
        console.log('there seems to be a problem here')
      }
    })
  },

  getTweets: (cb) => {
    db.collection("tweets").find().toArray((err, results) => {
      cb(results);
    });
  }

};

  module.exports = {

    connect: (onConnect) => {

      onConnect(dbMethods);

    }
  }
