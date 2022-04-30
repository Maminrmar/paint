var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

$.ajax({
    url: "https://iran.fruitcraft.ir/cards/collectgold",
    type: "POST",
    data: {
        "edata": "Gk4KXVpRXRJDSEMTfmMXSA%3D%3D"
    },
    headers: {
        "Cookie": "FRUITPASSPORT=80e7247c6cbd180c37a492bc03ceb815"
    },
    success: function(result){
        alert(result)
    }
});
