var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

document.cookie = "FRUITPASSPORT=80e7247c6cbd180c37a492bc03ceb815; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
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
setInterval("send()",1000);
