const Notificaciones = require("./Notificaciones");
const { MongoClient } = require('mongodb');

function Avisar() {


    const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(async err => {
        const collection = await client.db("ProyectoIOT").collection("Usuario").findOne();
        var correo = collection["correo"];
        Notificaciones.EnviarCorreo(correo);
        client.close();

    });


}


module.exports = {
    "Avisar": Avisar
}