

const { MongoClient } = require('mongodb');


const ObtenerDatos=(app)=>{
    const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(async err => {
        try{
         
        const collection2 = await(await client.db("ProyectoIOT").collection("Alerta").find().toArray());
        client.close();
             app.get(
            `/Alertas`,
            (req, res) => {
               
                res.send( collection2.slice(collection2.length-6,collection2.length-1) );
            }
             
        );
       
        }catch{}     
       
    });

   

   

}
module.exports = {
    "ObtenerDatos": ObtenerDatos
}
