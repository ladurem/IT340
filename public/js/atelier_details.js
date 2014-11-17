function dateDiff(array_date){

	date=array_date.split(",");


	var date_creneau = date[0];
	var debut_creneau = date[1];
	var fin_creneau = date[2];

	$("#start").html(debut_creneau);
	$("#end").html(fin_creneau);

	var timeStart = new Date(date[0]+" " + debut_creneau);
	var timeEnd = new Date(date[0]+" " + fin_creneau);

    var diff = {}                           // Initialisation du retour
    var tmp = timeEnd - timeStart;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    var hour_disp = diff.hour;

    if (hour_disp > 0 ) { 
    	hour_disp += " h et ";   
    }
    else{
    	hour_disp = "";
    }
    $("#duree").html(hour_disp+ diff.min +" minutes");

    return new Date(date_creneau);
}

