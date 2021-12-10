
const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const sensor = require('./Alertas');
const Usuarios = require("./Usuarios");
const { MongoClient } = require('mongodb');
const mqtt = require('mqtt');
const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/", (req, res) => {
    let cbCorreo = req.body.correo;
    let cbPagina = req.body.pagina;
    if (cbCorreo && cbPagina) {
        Usuarios.ModificarNotificacion(0);
    } else if (cbCorreo) {
        Usuarios.ModificarNotificacion(1);
    } else if (cbPagina) {
        Usuarios.ModificarNotificacion(2);
    } else {
        Usuarios.ModificarNotificacion(3);
    }
})

sensor.ObtenerDatos(app);

app.get(
    `/sensorA`,
    (req, res) => {
        client.connect(async err => {
            try {
                const collection = await (await client.db("ProyectoIOT").collection("SensorUltrasonico").find().toArray());


                client.close();

                res.send(collection.slice(collection.length - 8, collection.length - 1));
            } catch { }


        })
    });



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
    client.connect(async err => {
        try {
            const collection = await client.db("ProyectoIOT").collection("SensorUltrasonico");

            await collection.insertOne({
                id: arr[0],
                lectura: arr[1],
                fecha: new Date()
            });


            if (parseInt(arr[1]) < 25 && parseInt(arr[1]) > 0) {
                Usuarios.Avisar();
            }

            client.close();
        } catch { }
    });

    console.log('Mensaje Recibido', topic, arr[1]);
});