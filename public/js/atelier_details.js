function getDureeCreneaux(date_creneau,start,end){

    var timeStart = new Date(date_creneau+" " + start);
    var timeEnd = new Date(date_creneau+" " + end);

    // Initialisation du retour
    var tmp = timeEnd - timeStart;

    // SI le créneau termine le lendemain
    if(tmp < 0){
        timeEnd.setDate(timeEnd.getDate() + 1);
        var tmp = timeEnd - timeStart;
    }

    return tmp;
}

function affichageDuree (tmp) {

    if(tmp.length >= 0){

        var somme = 0;

        for (var i = tmp.length - 1; i >= 0; i--) {
            somme=somme+tmp[i];
        }
        tmp=somme;
    }

    var diff = {} 

    //alert(somme);
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    var hour_disp = diff.hour;
    var min_disp = diff.min;
    var et = " et ";
    if (hour_disp > 0 ) { 

        hour_disp += " heure";   
        if (diff.hour>1)
            hour_disp +="s";
    }
    else{
        hour_disp = "";
        et="";
    }

    if(diff.min > 1 )
        min_disp = et+diff.min+" minutes";
    else if(diff.min > 0 )
        min_disp = et+diff.min+" minute";
    if(diff.min <= 0)
        min_disp = '';

    $("#duree").html(hour_disp+ min_disp);
}