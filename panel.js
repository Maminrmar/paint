var TIMER = 30000;
var FRUITPASSPORT = "80e7247c6cbd180c37a492bc03ceb815";
var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);
$.ajaxSetup({
  beforeSend: function(request) {
    request.setRequestHeader("User-Agent","Dalvik/2.1.0 (Linux; U; Android 5.1; PRO 5 Build/LMY47D)");
  }
});
document.cookie = "FRUITPASSPORT="+FRUITPASSPORT+"; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
function showGold(){
$.ajax({
    url: "player/registerachievement",
    type: "POST",
    success: function(result){
        if(JSON.parse(result).data!=[]){
            var Gold = JSON.parse(result).data.gold;
            showDialog("Successfuly mined! Gold: "+Gold);
            return true;
        }else{
            return false;
            alert("Change IP");
        }
        
    }
});

}
function send(){
$.ajax({
    url: "/cards/collectgold",
    type: "POST",
    data: {
        "edata": "Gk4KXVpRXRJDSEMTfmMXSA=="
    },
    success: function(result){
        if(showGold()){
        }else{
            alert("Change IP");
        }
        
    }
});
}
setInterval("send()",TIMER);
send();
function showDialog(text) {
    const dialog = document.createElement("div");
    dialog.style.position = "fixed";
    dialog.style.top = "10px";
    dialog.style.left = "10px";
    dialog.style.width = "90%";
    dialog.style.background = "rgba(0,0,0,0.8)";
    dialog.style.color = "white";
    dialog.style.fontSize = "14px";
    dialog.style.textAlign = "center";
    dialog.style.padding = "10px";
    dialog.style.borderRadius = "10px";
    dialog.style.boxShadow = "0px 0px 10px black";
    dialog.style.zIndex = "30";
    dialog.innerHTML = text;
    document.body.appendChild(dialog);
    setTimeout(() => {
        document.body.removeChild(dialog);
    }, 8000);
}
