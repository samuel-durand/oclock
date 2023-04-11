var alarmIntervals = [];
var alarmHours = document.getElementById("alarm-hours");
var alarmMinutes = document.getElementById("alarm-minutes");
var alarmMessage = document.getElementById("alarm-message");
var alarmList = document.getElementById("alarm-list");

var alarmIntervals = [];
var alarmHours = document.getElementById("alarm-hours");
var alarmMinutes = document.getElementById("alarm-minutes");
var alarmMessage = document.getElementById("alarm-message");
var alarmList = document.getElementById("alarm-list");
var alarmSound = document.getElementById("alarm-sound");

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
    // Jouer le son
    var audio = new Audio('song.mp3');
    audio.play();
  
    // Sonner l'alarme
    alert(alarmMessage.value || "Réveil!!");
    alarmIntervals.splice(alarmIntervals.indexOf(alarmInterval), 1);
    updateAlarmList();
  }, timeToAlarm);
  
}

function clearAlarm() {
  // Effacer toutes les alarmes
  for (var i = 0; i < alarmIntervals.length; i++) {
    clearTimeout(alarmIntervals[i]);
  }
  alarmIntervals = [];
  updateAlarmList();
  alarmSound.pause();
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

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });