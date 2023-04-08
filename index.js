function updateClock(){
    //obtenir l'heure actuelle 
    var currentTime= new Date();

    //obtenir les heure ,minute et secondes
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // ajouter un zéro devant les minutes et les seconde si elles sont inferieur à 10
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    // mettre à jour l'horloge 

    document.getElementById("hours").innerHTML = currentHours;
    document.getElementById("minutes").innerHTML = currentMinutes;
    document.getElementById("seconds").innerHTML = currentSeconds;
}

setInterval(updateClock,1000)