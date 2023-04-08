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
  document.getElementById("minutes").innerHTML = currentMinutes;
  document.getElementById("seconds").innerHTML = currentSeconds;
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
var timeDisplay = document.getElementById("timer-display");
var startTimeButton = document.getElementById("start-timer");
var pauseTimerButton = document.getElementById("pause-timer");
var resetTimerButton = document.getElementById("reset-time");

var hoursInput = document.getElementById("hours-input");
var minutesInput = document.getElementById("minutes-input");
var secondsInput = document.getElementById("seconds-input");

var hours = 0;
var minutes = 0;
var seconds = 0;


function updateTimerDisplay(){
  timeDisplay.innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}







