$(function() {
   redirect_init();
});

function redirect_init() {
   var params = {}, queryString = location.hash.substring(1),
       regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
     params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }
   localStorage.setItem("accessToken", params[0]);
   opener.json.callback();
   //close();
}
