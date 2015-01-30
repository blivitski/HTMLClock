function getTime() {
   var d = new Date();
   document.getElementById("clockSpace").innerHTML = d;
   setTimeout(getTime, 1000);
}

function getTemp() {
   $.getJSON("https://api.forecast.io/forecast/91cb3bb4690039bbf007651bcf100c36/35.300399,-120.662362?callback=?", setTemp(result));
}

function setTemp(result) {
   $("#forecastLabel").html(result.daily.summary);
   $("#forecastIcon").attr("src", "img/" + result.daily.icon + ".png");
   var curTemp = result.currently.temperatureMax;
   if (curTemp < 60) {
      $("body").addClass("cold");
   }
   else if (curTemp >= 60 && curTemp < 70) {
      $("body").addClass("chilly");
   }
   else if (curTemp >= 70 && curTemp < 80) {
      $("body").addClass("nice");
   }
   else if (curTemp >= 80 && curTemp < 90) {
      $("body").addClass("warm");
   else {
      $("body").addClass("hot");
   }
}
