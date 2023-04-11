


var chronometer = null;
var startTime = null;
var elapsedTime = 0;
var tours = [];

var chronoDisplay = document.getElementById("chrono-display");
var chronoStartStopBtn = document.getElementById("chrono-startstop");
var chronoTourBtn = document.getElementById("chrono-tour");
var chronoResetBtn = document.getElementById("chrono-reset");
var chronoToursList = document.getElementById("chrono-tours");

chronoStartStopBtn.addEventListener("click", function() {
  if (chronometer === null) {
    // Démarrer le chronomètre
    chronometer = setInterval(updateChrono, 10);
    startTime = new Date().getTime() - elapsedTime;
    chronoStartStopBtn.innerHTML = "Stop";
  } else {
    // Arrêter le chronomètre
    clearInterval(chronometer);
    chronometer = null;
    chronoStartStopBtn.innerHTML = "Start";
  }
});

chronoTourBtn.addEventListener("click", function() {
  if (chronometer !== null) {
    // Ajouter le temps actuel à la liste des tours
    var tourTime = elapsedTime;
    var minutes = Math.floor(tourTime / (1000 * 60));
    tourTime -= minutes * (1000 * 60);
    var seconds = Math.floor(tourTime / 1000);
    tourTime -= seconds * 1000;
    var centiseconds = Math.floor(tourTime / 10);
    var tourString = zeroPad(minutes) + ":" + zeroPad(seconds) + ":" + zeroPad(centiseconds);
    var tourItem = document.createElement("li");
    tourItem.innerHTML = tourString;
    chronoToursList.appendChild(tourItem);
  }
});

chronoResetBtn.addEventListener("click", function() {
  // Réinitialiser le chronomètre
  clearInterval(chronometer);
  chronometer = null;
  elapsedTime = 0;
  chronoDisplay.innerHTML = "00:00:00";
  chronoStartStopBtn.innerHTML = "Start";
  chronoToursList.innerHTML = "";
});

function updateChrono() {
  // Mettre à jour le chronomètre
  var currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;
  var minutes = Math.floor(elapsedTime / (1000 * 60));
  elapsedTime -= minutes * (1000 * 60);
  var seconds = Math.floor(elapsedTime / 1000);
  elapsedTime -= seconds * 1000;
  var centiseconds = Math.floor(elapsedTime / 10);
  chronoDisplay.innerHTML = zeroPad(minutes) + ":" + zeroPad(seconds) + ":" + zeroPad(centiseconds);
}

function zeroPad(num) {
  // Ajouter un zéro devant un chiffre s'il est inférieur à 10
  if (num < 10) {
    return "0" + num;
  } else {
    return num.toString();
  }
}
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});