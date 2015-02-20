$(function(){
   getTemp();
   getAllAlarms();
});

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    gapi.client.load('plus','v1', function(){
       var request = gapi.client.plus.people.get({
         'userId': 'me'
       });
       request.execute(function(resp) {
       console.log('Retrieved profile for:' + resp.displayName);
       });
    });
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

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

function insertAlarm(time, alarmName) {
   var blankDiv = $("<div>");
   blankDiv.addClass("flexable");
   var innerDiv1 = $("<div>");
   innerDiv1.addClass("name");
   innerDiv1.html(alarmName);
   var innerDiv2 = $("<div>");
   innerDiv2.addClass("time");
   innerDiv2.html("-" + time);
   blankDiv.append(innerDiv1);
   blankDiv.append(innerDiv2);
   var deleteDiv = $("<div>");
   deleteDiv.addClass("deleteDiv");
   deleteDiv.append("<input type='button' value='Remove' align='right' onclick='deleteAlarm()'>");
   blankDiv.append(deleteDiv);
   $("#alarms").append(blankDiv);
}

function addAlarm() {
   var hours = $("#hours option:selected").text();
   var mins = $("#mins option:selected").text();
   var ampm = $("#ampm option:selected").text();
   var alarmName = $("#alarmName").val();
   var time = hours + ":" + mins + ampm;

   var AlarmObject = Parse.Object.extend("Alarm");
   var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
         insertAlarm(time, alarmName);
         hideAlarmPopup();
      }
    });
}

function deleteAlarm() {
   var deleteDiv = event.target;
   var alarmName = deleteDiv.parentNode.parentNode.childNodes[0].innerHTML;
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.equalTo("alarmName", alarmName);
   query.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) { 
            results[i].destroy({
               success: function(obj) {
                  console.log("successfully deleted");
               },
               error: function (obj, error) {
                  console.log("failed to delete");}
           });
        }
      }
    });
   deleteDiv.parentNode.parentNode.remove();
}

function getAllAlarms() {
   Parse.initialize("nFOUCJdMifnmc5r8hxJr4UKYcutangiVPINUxAk4", "TCBba331COXPKLcyBHjfknxnlIOVphJHYpyMVz1G");
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i].get("time"), results[i].get("alarmName"));
          }
        }
    });
}
