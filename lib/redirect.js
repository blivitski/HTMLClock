$(function() {
   redirect_init();
});

function redirect_init() {
   var params = {}, queryString = location.hash.substring(1),
       regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
     params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }
   localStorage.setItem("accessToken", params.access_token);
   opener.json.callback();
   close();
}
