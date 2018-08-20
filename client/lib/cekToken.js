function cekToken(){
    alert("welcome to My Todo")
    if(localStorage.getItem("fbToken") || localStorage.getItem("token") ){
        alert("lanjutt !")
    }else{
        alert("gw kick yahh !")
        window.location.replace("/index.html")
    }
}