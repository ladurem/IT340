function dateDiff(date_creneau,start,end){

	var debut_creneau = start;
	var fin_creneau = end;

	$("#start").html(debut_creneau);
	$("#end").html(fin_creneau);

	var timeStart = new Date(date_creneau+" " + debut_creneau);
	var timeEnd = new Date(date_creneau+" " + fin_creneau);

    var diff = {}                           // Initialisation du retour
    var tmp = timeEnd - timeStart;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    var hour_disp = diff.hour;
    var min_disp = diff.min;

    if (hour_disp > 0 ) { 
    	hour_disp += " h";   
    }
    else
    	hour_disp = "";

    if (min_disp > 0){
    	min_disp =" et "+min_disp+ " minutes";    	
    }
    else{
    	min_disp="";
    }

    $("#duree").html(hour_disp+ min_disp);

    return new Date(date_creneau);
}

