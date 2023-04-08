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


var timerInterval; // variable pour stocker l'intervalle du minuteur

function startTimer() {
  // Définir les heures, minutes et secondes restantes sur les valeurs maximales
  document.getElementById("timer-hours").innerHTML = "00";
  document.getElementById("timer-minutes").innerHTML = "00";
  document.getElementById("timer-seconds").innerHTML = "00";

  // Démarrer l'intervalle du minuteur
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  // Arrêter l'intervalle du minuteur
  clearInterval(timerInterval);
}

function resetTimer() {
  // Réinitialiser le minuteur
  stopTimer();
  document.getElementById("timer-hours").innerHTML = "00";
  document.getElementById("timer-minutes").innerHTML = "00";
  document.getElementById("timer-seconds").innerHTML = "00";
}

function updateTimer() {
  // Obtenir les heures, minutes et secondes restantes
  var remainingHours = document.getElementById("timer-hours").innerHTML;
  var remainingMinutes = document.getElementById("timer-minutes").innerHTML;
  var remainingSeconds = document.getElementById("timer-seconds").innerHTML;

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
  document.getElementById("timer-hours").innerHTML = remainingHours;
  document.getElementById("timer-minutes").innerHTML = remainingMinutes;
  document.getElementById("timer-seconds").innerHTML = remainingSeconds;
}



// Ajouter des écouteurs d'événements aux boutons pour démarrer, arrêter et réinitialiser le minuteur
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);