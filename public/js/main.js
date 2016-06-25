(function ($) {
    function getKeys(obj) {
    	var hasOwn = Object.prototype.hasOwnProperty;
        var keys = [];
        var name;

        for (name in obj) {
            if (hasOwn.call(obj, name)) {
                keys.push(name);
            }
        }

        return keys;
    }

    $(document).ready(function() {

        var emptyValue = "-"

    	$.ajax({
			url: "http://localhost:1450/data",
			dataType: "json",
		})
		.done(function (data) {
			var i;
 			var keys = getKeys(data);

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

				for(i = 0; i < services.length; i++){
					service = services[i];
					keys = getKeys(service);

					ser_name = emptyValue;
					svt_id = emptyValue;
					ngt_qty = emptyValue;
					date = emptyValue;
					to_date = emptyValue;

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

						if(isNaN(ngt_qty)){
							ngt_qty=emptyValue;
						}
					}

					if (keys.indexOf("date") != -1){
						date = service["date"];
						date = new Date(date);
					}

					if(svt_id===0 || svt_id===7){
						to_date = date.getTime() + ngt_qty*24*60*60*1000;
						to_date = new Date(to_date);
						to_date = dateFormat(to_date, "dd mmm");
					}
					else{
						ngt_qty= emptyValue
					}

					date = dateFormat(date, "dd mmm");



					template = "<tr>" +
						"<td>" + ser_name + "</td>" + 
						"<td>" + svt_id + "</td>" + 
						"<td>" + ngt_qty + "</td>" + 
						"<td>" + date + "</td>" + 
						"<td>" + to_date + "</td>" +
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



