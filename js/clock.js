$(function(){
   getTemp();
});

function getTime() {
   var d = new Date();
   document.getElementById("clockSpace").innerHTML = d;
   setTimeout(getTime, 1000);
}

function getTemp() {
   $.getJSON("https://api.forecast.io/forecast/91cb3bb4690039bbf007651bcf100c36/35.300399,-120.662362?callback=?", function (result) {
   $("#forecastLabel").html(result.daily.summary);
   $("#forecastIcon").attr("src", "img/" + result.daily.icon + ".png");
   var curTemp = result.currently.temperature;
   if (curTemp < 60) {
      $("body").addClass("cold");
      $("html").addClass("cold");
   }
   else if (curTemp < 70) {
      $("body").addClass("chilly");
      $("html").addClass("chilly");
   }
   else if (curTemp < 80) {
      $("body").addClass("nice");
      $("html").addClass("nice");
   }
   else if (curTemp < 90) {
      $("body").addClass("warm");
      $("html").addClass("warm");
   }
   else {
      $("body").addClass("hot");
      $("html").addClass("hot");
   }
});
}
