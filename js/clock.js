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

function showAlarmPopup() {
   $("#mask").removeClass("hide");
   $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
   $("#mask").addClass("hide");
   $("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
   var blankDiv = $("<div>");
   blankDiv.addClass("flexable");
   var innerDiv1 = $("<div>");
   innerDiv1.addClass("name");
   innerDiv1.html(alarmName + "-");
   var innerDiv2 = $("<div>");
   innerDiv2.addClass("time");
   innerDiv2.html(hours + ":" + mins + ampm);
   blankDiv.append(innerDiv1);
   blankDiv.append(innerDiv2);
   $("#alarms").append(blankDiv);
}

function addAlarm() {
   var hours = $("#hours option:selected").text();
   var mins = $("#mins option:selected").text();
   var ampm = $("#ampm option:selected").text();
   var alarmName = $("#alarmName").val();
   insertAlarm(hours, mins, ampm, alarmName);
   hideAlarmPopup();
}

















