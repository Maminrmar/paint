var url = "/cards/collectgold";
var params = "edata=Gk4KXVpRXRJDSEMTfmMXSA==";
var http = new XMLHttpRequest();
http.open("POST", url, true);

http.setRequestHeader( "Host" , "iran.fruitcraft.ir " );
http.setRequestHeader( "User-Agent" , "Dalvik/2.1.0 (Linux; U; Android 5.1; PRO 5 Build/LMY47D) " );
http.setRequestHeader( "Accept-Encoding" , "gzip, deflate " );
http.setRequestHeader( "Accept" , "*/* " );
http.setRequestHeader( "Connection" , "keep-alive " );
http.setRequestHeader( "Cookie" , "FRUITPASSPORT=80e7247c6cbd180c37a492bc03ceb815 " );
http.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded; charset=UTF-8" );

http.send(params);
alert(http.responseText);
