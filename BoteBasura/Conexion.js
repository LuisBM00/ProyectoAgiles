

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports={
    client:client
}