$(function() {
   redirect_init();
});

function redirect_init() {
   var token = location.hash.substring(14);//14 passes "#access_token=" string
   localStorage.setItem('accessToken', token);
   opener.json.callback();
   close();
}
