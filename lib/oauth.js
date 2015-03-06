var json = {client_id: "", type: "", callback: null}

$(function(){
   init(json);
});

function init(emptyInit) {
   emptyInit.client_id = "4c087afe2e1abcd";
   emptyInit.type = "token";
   emptyInit.callback = authorizeCallback;
}

function login() {
   window.open("https://api.imgur.com/oauth2/authorize?client_id=" + json.client_id + "&response_type=" + json.type) 
}

function authorizeCallback() {
   var token = localStorage.getItem("accessToken");
   if (token != null) {
      $.ajax({
         beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + token);
         },
         url: "https://api.imgur.com/3/account/me",
         success: function(imgurResponse) {
            $("#buttonDiv").html("Imgur Username" + imgurResponse.data.url);
            alert(imgurResponse.data.url);
         },
         error: function() {
            localStorage.removeItem("accessToken");
         }
      });
   }
}
