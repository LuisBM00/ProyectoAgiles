

const mqtt = require('mqtt');

const Usuarios = require("./Usuarios");
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const UrlMQTT = `mqtt://localhost:1883`

const clienteMQTT = mqtt.connect(UrlMQTT);

const topico = 'LecturaSensor'
clienteMQTT.on('connect', () => {
    console.log('Connected')
    clienteMQTT.subscribe([topico], () => {
        console.log(`Subscribe to topic '${topico}'`)
    })
});

clienteMQTT.on('message', (topic, mensaje) => {
    var msj = mensaje.toString();
    var arr = msj.split(",");


    if (parseInt(arr[1]) < 25) {
        client.connect(async err => {
            const collection = await client.db("ProyectoIOT").collection("SensorUltrasonico");

            await collection.insertOne({
                id: arr[0],
                lectura: arr[1],
                fecha: new Date()
            })
      Usuarios.Avisar();
            client.close();
        });
    }
    console.log('Received Message:', topic, arr[1]);
});