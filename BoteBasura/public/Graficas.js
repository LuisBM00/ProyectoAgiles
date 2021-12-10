


window.onload=function(){
	
	fetch('http://localhost:3000/sensorA')
	.then(response => response.json())
	.then(data =>{
		console.log(data);
		NivelBasura(data[0]["lectura"]);
		EstadoSensor(data);});

	fetch('http://localhost:3000/Alertas')
	.then(response => response.json())
	.then(data =>{
		
		for(i=0; i<5;i++){
			let fecha= new Date(data[i]["fecha"]).toLocaleString();
			
		document.getElementById("alerta"+(i+1)).innerHTML=data[i]["mensaje"];
		document.getElementById("fechaAlerta"+(i+1)).innerHTML=fecha;
		document.getElementById("medio"+(i+1)).innerHTML=data[i]["medio"];
		}
  });

setInterval(() => {
	

	fetch('http://localhost:3000/sensorA')
	.then(response => response.json())
	.then(data =>{
		console.log(data);
		NivelBasura(data[0]["lectura"]);
		EstadoSensor(data);
  })},15000);
  
function NivelBasura(lectura){
var chart = new CanvasJS.Chart("chartContainer", {
    
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
        text: "Nivel de Basura"
    },
    data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
            { y: (100-lectura), label: "Basura" },
            { y: lectura, label: "Espacio libre" }
         
        ]
    }]
});

chart.render();
}

function EstadoSensor(datos){
	let data=datos.map(e=>{

		return {x:new Date(e["fecha"]),y:parseInt(e["lectura"])}
	})

var chart2 = new CanvasJS.Chart("chartContainer2", {
	animationEnabled: true,
	title:{
		text: "Estado del Sensor"
	},
	axisX:{
		valueFormatString: "DD MMM HH:m",
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		}
	},
	axisY: {
		title: "Lectura",
		valueFormatString: "0.00",
		crosshair: {
			enabled: true,
			snapToDataPoint: true,
			labelFormatter: function(e) {
				return "" + CanvasJS.formatNumber(e.value, "##0.00");
			}
		}
	},
	data: [{
		type: "area",
		xValueFormatString: "DD MMM",
		yValueFormatString: "%0.0",
		dataPoints:data
	}]
});
chart2.render();
}
}

