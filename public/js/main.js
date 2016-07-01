(function ($) {
    function getKeys(obj) {
    	//esta variable es un objeto que abstrae los datos para usarlos en el objeto que hereda de ese prototipo
    	var hasOwn = Object.prototype.hasOwnProperty;
        var keys = [];
        var name;
        //prototipo de lo que vamos a buscar
        for (name in obj) {
            if (hasOwn.call(obj, name)) {
                keys.push(name);
            }
        }

        return keys;
    }

    $(document).ready(function() {

        var emptyValue = "-"
//localizamos el json desde un servidor para eso tenemos que crear un archivo server.js que nos permita acceder de red a red
    	$.ajax({
			url: "http://localhost:1450/data",
			dataType: "json",
		})
		.done(function (data) {
			var i;
			//utilizamos la funcion que creamos para ello(2)
 			var keys = getKeys(data);
//aqui empieza realmente el ejercicio, si Services existe recorrerá la data hasta encontrar las variables requeridas (1)
			if(keys.indexOf("Services") != -1){
				var $table = $("#table tbody");

				var services = data["Services"];
				var service;

				var ser_name;
				var svt_id;
				var ngt_qty;
				var date;
				var to_date;

				var template;
//cuando encuentre Services, recorrerá en un array cada elemento del bucle
				for(i = 0; i < services.length; i++){
					service = services[i];
					keys = getKeys(service);
//id's de servicios a buscar
					ser_name = emptyValue;
					svt_id = emptyValue;
					ngt_qty = emptyValue;
					date = emptyValue;
					to_date = emptyValue;
					des_name = emptyValue;
				

//el elemento service busca "ser_name" si lo encuentra lo almacena en otra variable
					if (keys.indexOf("ser_name") != -1){
						ser_name = service["ser_name"];
					}

					if (keys.indexOf("svt_id") != -1){
						svt_id = service["svt_id"];
						svt_id = parseFloat(svt_id);

						if(isNaN(svt_id)){
							svt_id=emptyValue;
						}
					}

					if (keys.indexOf("ngt_qty") != -1){
						ngt_qty = service["ngt_qty"];
						ngt_qty = parseFloat(ngt_qty);

					}

					if (keys.indexOf("date") != -1){
						date = service["date"];
						date = new Date(date);
					}
//restricciones
					if(svt_id===0 || svt_id===7){
						to_date = date.getTime() + ngt_qty*24*60*60*1000;
						to_date = new Date(to_date);
						to_date = dateFormat(to_date, "dd mmm");
					}
					else{
						ngt_qty= emptyValue
					}

					if (keys.indexOf("des_name") !=-1){
						des_name= service["des_name"];
					}

					date = dateFormat(date, "dd mmm");

//cuando el elemento está vacío se muestra la variable sgte

					if(isNaN(service)){
							service=emptyValue;
						}
//pintandolo en el html

					template = "<tr>" +
						"<td>" + ser_name + "</td>" + 
						"<td>" + svt_id + "</td>" + 
						"<td>" + ngt_qty + "</td>" + 
						"<td>" + date + "</td>" + 
						"<td>" + to_date + "</td>" +
						"<td>" + des_name + "</td>" +
						"</tr>";
 
					$table.append(template); 
				}
			}

			console.log(getKeys(data));
		})
		.fail(function () {
			alert("contra");
		});
    })
})(jQuery)



