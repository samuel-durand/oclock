// minuteur 

var timerInterval = null;
var timerDisplay = document.getElementById("timer-display");
var timerHours = document.getElementById("timer-hours");
var timerMinutes = document.getElementById("timer-minutes");
var timerSeconds = document.getElementById("timer-seconds");

function startTimer() {
  // Récupérer la durée du minuteur
  var hours = parseInt(timerHours.value) || 0;
  var minutes = parseInt(timerMinutes.value) || 0;
  var seconds = parseInt(timerSeconds.value) || 0;
  var durationInSeconds = hours * 3600 + minutes * 60 + seconds;

  if (durationInSeconds <= 0) {
    alert("La durée doit être supérieure à 0 !");
    return;
  }

  // Démarrer le minuteur
  var startTime = Date.now();
  var endTime = startTime + durationInSeconds * 1000;

  timerInterval = setInterval(function() {
    var now = Date.now();
    var timeLeftInSeconds = Math.round((endTime - now) / 1000);

    if (timeLeftInSeconds < 0) {
      // Le minuteur est terminé
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.innerText = "Terminé !";
    } else {
      // Afficher le temps restant
      var hoursLeft = Math.floor(timeLeftInSeconds / 3600);
      var minutesLeft = Math.floor((timeLeftInSeconds % 3600) / 60);
      var secondsLeft = timeLeftInSeconds % 60;
      timerDisplay.innerText = hoursLeft + " h " + minutesLeft + " min " + secondsLeft + " sec";
    }
  }, 1000);
}

function stopTimer() {
  // Arrêter le minuteur
  clearInterval(timerInterval);
  timerInterval = null;
  timerDisplay.innerText = "Arrêté";
}

document.getElementById("start-timer").addEventListener("click", startTimer);
document.getElementById("stop-timer").addEventListener("click", stopTimer);


window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });