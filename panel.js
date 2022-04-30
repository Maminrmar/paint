var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

$.ajax({
    url: "/player/changerc",
    type: "POST",
    data: {
        "edata": ""
    },
    success: function(result){
        alert(result)
    }
});
