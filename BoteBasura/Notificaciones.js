
const { MongoClient } = require('mongodb');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function AvisarPorSockets()
{
  GuardarAviso("Sockets");
  wss.clients.forEach(function(client) {
    client.send("Su bote de basura esta a punto de llenarse");
    
  });

}


function EnviarCorreo(correo){
GuardarAviso("Correo");
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'proyectoiot.itson21@gmail.com',
    pass: 'ITSON2021'
  }
});

var mensaje = "Tu bote de basura esta lleno";

var mailOptions = {
    from: 'proyectoiot.itson21@gmail.com',
    to: correo,
    subject: 'Bote de Basura',
    text: mensaje
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
  }

  const GuardarAviso=(Medio)=>{
    const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(async err => {
        try{
      const collection = await client.db("ProyectoIOT").collection("Alerta");

      await collection.insertOne({
       
        
          fecha: new Date(),
          mensaje:"Bote por llenarse",
          medio:Medio
      });
       client.close();

      }catch{}
       
    });

  }


  module.exports={
    "EnviarCorreo":EnviarCorreo,
    "AvisarPorSockets":AvisarPorSockets
}