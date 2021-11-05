function EnviarCorreo(correo){

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
  module.exports={
    "EnviarCorreo":EnviarCorreo
}