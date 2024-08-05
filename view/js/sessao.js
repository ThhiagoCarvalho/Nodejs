
    function existeSessao(){
        const token = localStorage.getItem("token");
        const payload = localStorage.getItem("payload");
        
        if ( token == '' || payload==''){
            window.location("login.html")
            return
        }else{
     return JSON.parse(payload)         
        }

    }
