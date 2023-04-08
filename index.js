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


var timerInterval; // variable pour stocker l'intervalle du minuter

function startTimer() {
    // demarrer l'intervar du minuteur
    timerInterval = setInterval(updateTimer,1000);

}

function stopTimer(){
    //arreter l'intervalle du timer
    clearInterval(timerInterval);
}

function resetTimer(){
    //réinitialiser le timer
    stopTimer();
    document.getElementById("hours").innerHTML ="00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";

}


function updateTimer() {
    // Obtenir les heures, minutes et secondes restantes
    var remainingHours = document.getElementById("hours").innerHTML;
    var remainingMinutes = document.getElementById("minutes").innerHTML;
    var remainingSeconds = document.getElementById("seconds").innerHTML;
  
    // Soustraire une seconde
    if (remainingSeconds == "00") {
      if (remainingMinutes == "00") {
        if (remainingHours == "00") {
          // Le minuteur est terminé
          stopTimer();
          alert("Le minuteur est terminé!");
          return;
        }
        remainingHours--;
        remainingMinutes = 59;
      } else {
        remainingMinutes--;
      }
      remainingSeconds = 59;
    } else {
      remainingSeconds--;
    }
  
    // Ajouter un zéro devant les heures, minutes et secondes si elles sont inférieures à 10
    remainingHours = (remainingHours < 10 ? "0" : "") + remainingHours;
    remainingMinutes = (remainingMinutes < 10 ? "0" : "") + remainingMinutes;
    remainingSeconds = (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
  
    // Mettre à jour le minuteur
    document.getElementById("hours").innerHTML = remainingHours;
    document.getElementById("minutes").innerHTML = remainingMinutes;
    document.getElementById("seconds").innerHTML = remainingSeconds;
  }



// Ajouter des écouteurs d'événements aux boutons pour démarrer, arrêter et réinitialiser le minuteur
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);