function updateClock(){
  //obtenir l'heure actuelle 
  var currentTime= new Date();

  //obtenir les heure ,minute et secondes 
  var currentHours = currentTime.toLocaleString("fr-FR", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
    minute: "2-digit",
    second: "2-digit"
  }).replace(/:/g, '<span class="clock-separator">:</span>');
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  

  // mettre à jour l'horloge 

  document.getElementById("hours").innerHTML = currentHours;
  
}

setInterval(updateClock,1000);


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


var alarmIntervals = [];
var alarmHours = document.getElementById("alarm-hours");
var alarmMinutes = document.getElementById("alarm-minutes");
var alarmMessage = document.getElementById("alarm-message");
var alarmList = document.getElementById("alarm-list");

function setAlarm() {
  // Régler l'alarme
  var now = new Date();
  var alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHours.value, alarmMinutes.value, 0, 0);
  var timeToAlarm = alarmTime.getTime() - now.getTime();
  if (timeToAlarm <= 0) {
    // L'heure de l'alarme est passée
    alert("L'heure de l'alarme est passée!");
    return;
  }
  var alarmInterval = setTimeout(function() {
    // Sonner l'alarme
    alert(alarmMessage.value || "Réveil!!");
    alarmIntervals.splice(alarmIntervals.indexOf(alarmInterval), 1);
    updateAlarmList();
  }, timeToAlarm);
  alarmIntervals.push(alarmInterval);
  updateAlarmList();
}

function clearAlarm() {
  // Effacer toutes les alarmes
  for (var i = 0; i < alarmIntervals.length; i++) {
    clearTimeout(alarmIntervals[i]);
  }
  alarmIntervals = [];
  updateAlarmList();
}

function updateAlarmList() {
  // Mettre à jour la liste des alarmes
  alarmList.innerHTML = "";
  for (var i = 0; i < alarmIntervals.length; i++) {
    var timeToAlarm = alarmIntervals[i]._idleTimeout;
    var message = alarmMessage.value || "Alarme";
    var alarmTime = new Date(Date.now() + timeToAlarm);
    var hours = alarmTime.getHours();
    var minutes = alarmTime.getMinutes();
    var alarmListItem = document.createElement("li");
    if (timeToAlarm <= 0) {
      // L'heure de l'alarme est passée
      alarmListItem.innerText = message + " passée";
    } else {
      // L'heure de l'alarme est future
      var timeToAlarmInSeconds = Math.round(timeToAlarm / 1000);
      var minutes = Math.floor(timeToAlarmInSeconds / 60);
      var seconds = timeToAlarmInSeconds % 60;
      alarmListItem.innerText = message + " à " + hours + "h" + minutes;
    }
    alarmList.appendChild(alarmListItem);
  }
}


document.getElementById("set-alarm").addEventListener("click", setAlarm);
document.getElementById("clear-alarm").addEventListener("click", clearAlarm);

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



function updateDate() {
  var today = new Date();
  var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  var dayOfWeek = days[today.getDay()];
  var dayOfMonth = today.getDate();
  var month = months[today.getMonth()];
  var year = today.getFullYear();
  var dateElement = document.getElementById("date");
  dateElement.innerText = dayOfWeek + " " + dayOfMonth + " " + month + " " + year;
}

updateDate();
setInterval(updateDate, 1000*60*60*24); // Mettre à jour tous les jours à minuit


window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});



