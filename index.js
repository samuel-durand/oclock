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



