const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb://ArunDharekar:Arun2004@ac-5cevgnj-shard-00-00.lmcnjko.mongodb.net:27017,ac-5cevgnj-shard-00-01.lmcnjko.mongodb.net:27017,ac-5cevgnj-shard-00-02.lmcnjko.mongodb.net:27017/goFood?ssl=true&replicaSet=atlas-38mtts-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
