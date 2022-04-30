var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);
if(typeof(FRUITPASSPORT)==undefined || typeof(TIMER)==undefined){
    alert("Error!");
    window.location.reload()
}
document.cookie = "FRUITPASSPORT="+FRUITPASSPORT+"; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
function send(){
$.ajax({
    url: "/cards/collectgold",
    type: "POST",
    data: {
        "edata": "Gk4KXVpRXRJDSEMTfmMXSA=="
    },
    success: function(result){
        console.log(result)
    }
});
}
setInterval("send()",TIMER);
