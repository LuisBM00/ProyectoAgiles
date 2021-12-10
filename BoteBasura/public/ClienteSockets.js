const ws = new WebSocket('ws://localhost:8080/ws');

ws.onmessage=({data})=>{
    
    document.getElementById("aviso").style.display="block";
   document.getElementById("aviso").innerHTML=data;
    console.log(data);
}

let tipoNotificacion=0;
document.getElementById("correo").addEventListener("change",()=>{
    tipoNotificacion=0;
    if(document.getElementById("correo").checked && document.getElementById("socket").checked){
        tipoNotificacion=0;
    }else if(document.getElementById("correo").checked){
        tipoNotificacion=1;
    }else if(document.getElementById("socket").checked){
        tipoNotificacion=2;
    }else{
        tipoNotificacion=3;
    }


});



