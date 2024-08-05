
    const URI = '/usuariosss'
    
    const txtNome = document.getElementById("txtNome");
    const txtEmail = document.getElementById("txtEmail");
    const txtSenha = document.getElementById("txtSenha");

    const divResposta = document.getElementById("divResposta");
    const paragrafo = document.createElement("p")

    const btnCadastro = document.getElementById("bntCadastrar");
    
    btnCadastro.onclick = onclick_btnCadastro;
    function onclick_btnCadastro(){
        const nomeUsuario = txtNome.value;
        const emailUsuario = txtEmail.value;
        const senha = txtSenha.value;
        
        

        const obj = { 
            nomeUsuario : nomeUsuario,
            emailUsuario  : emailUsuario,
            senha : senha
        }


        fetch_post_verificaarCadastro(obj)

    }
   
    function fetch_post_verificaarCadastro(obj){

        const textoJSON = JSON.stringify(obj);

        const requisicao = fetch(URI,{
        method:'post',
        headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Authorization': "Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkVXN1YXJpbyI6MTQyLCJub21lVXN1YXJpbyI6InJvYmVydG8iLCJlbWFpbFVzdWFyaW8iOiJtaW5kZUBnbWFpbCIsIm5hc2NpbWVudG8iOiIxMjMvMzIvMiJ9LCJpYXQiOjE3MjEyNDYyMzIsImV4cCI6MTcyMjMyNjIzMn0.ka7vnHooypRKehZbhoxv9B1g7B6Ik47y9QQEVRnXbEI>",
        },
        body : textoJSON

    });

    requisicao.then((response)=>{return response.text();} ).then ((jsonTextoResposta)=>{
        const obj = JSON.parse(jsonTextoResposta);
                console.log("obj >>> " +  JSON.stringify(obj))

        if (obj.status == true){
            paragrafo.textContent = 'cadastrro valido'
            divResposta.appendChild(paragrafo)

            localStorage.setItem('token' , obj.token);
            localStorage.setItem("payload", JSON.stringify(obj.dados))


        }else{
            paragrafo.textContent = 'cadastro invalido'
            divResposta.appendChild(paragrafo)
        }


    })

    requisicao.catch((erro)=>{
        console.log("eroo >>> " + erro)
    })




    }
        