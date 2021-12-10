const Notificaciones = require("./Notificaciones");

const { MongoClient } = require('mongodb');

function Avisar() {


    const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(async err => {
        const collection = await client.db("ProyectoIOT").collection("Usuario").findOne();
        let correo = collection["correo"];
        let tipoNotificacion=parseInt(collection["tipoNotificacion"]);
        if(tipoNotificacion===0){
        Notificaciones.EnviarCorreo(correo);
        Notificaciones.AvisarPorSockets();
        }else if(tipoNotificacion===1){
            Notificaciones.EnviarCorreo(correo);
        }else if(tipoNotificacion===2){
            Notificaciones.AvisarPorSockets();
        }
        client.close();

    });


}

function ModificarNotificacion(tipoNotificacion) {


    const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(async err => {
        const collection = await client.db("ProyectoIOT").collection("Usuario").findOne().then();
        await client.db("ProyectoIOT").collection("Usuario").updateOne({
            _id : collection["_id"]} , {$set : {tipoNotificacion:tipoNotificacion} 

        });
       
        client.close();

    });


}

module.exports = {
    "Avisar": Avisar,
    "ModificarNotificacion":ModificarNotificacion
}