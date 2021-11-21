window.onload=function(){

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
            { y: 50, label: "Basura" },
            { y: 19, label: "Espacio libre" }
         
        ]
    }]
});

chart.render();

var chart2 = new CanvasJS.Chart("chartContainer2", {
	animationEnabled: true,
	title:{
		text: "Estado del Sensor"
	},
	axisX:{
		valueFormatString: "DD MMM",
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
		yValueFormatString: "$##0.00",
		dataPoints: [
			{ x: new Date(2016, 07, 01), y: 100 },
			{ x: new Date(2016, 07, 02), y: 78 },
			{ x: new Date(2016, 07, 03), y: 68 },
			{ x: new Date(2016, 07, 04), y: 66 },
			{ x: new Date(2016, 07, 05), y: 60 },
			{ x: new Date(2016, 07, 08), y: 56 },
			{ x: new Date(2016, 07, 09), y: 50 },
			{ x: new Date(2016, 07, 10), y: 50 },
			{ x: new Date(2016, 07, 11), y: 45 },
			{ x: new Date(2016, 07, 12), y: 44 },
			{ x: new Date(2016, 07, 15), y: 34 },
			{ x: new Date(2016, 07, 16), y: 30 },
			{ x: new Date(2016, 07, 17), y: 29 },
			{ x: new Date(2016, 07, 18), y: 20 },
			{ x: new Date(2016, 07, 19), y: 19 },
		
		]
	}]
});
chart2.render();
}