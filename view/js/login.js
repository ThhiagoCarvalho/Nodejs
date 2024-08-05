const URI = '/login';

const txtEmail = document.getElementById("txtEmail");
const txtSenha = document.getElementById("txtSenha");
const divResposta = document.getElementById("divResposta");
const btnLogin = document.getElementById("btnLogin");

let p = document.createElement("p");


btnLogin.onclick = onclick_btnLogin;
function onclick_btnLogin(){
    const email = txtEmail.value;
    const senha = txtSenha.value;

  
    const obj = { 
        emailUsuario : email,
        senha : senha
    }
    fetch_post_verificarLogin(obj);

}

function fetch_post_verificarLogin(obj){
        const textoJSON = JSON.stringify(obj);
        const requisicao = fetch(URI,{
    method:'post',
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Authorization': ""
    },
    body: textoJSON

});

requisicao.then((response)=>{return response.text();} ).then((jsonTextoResposta)=>{

    const obj = JSON.parse(jsonTextoResposta);
    if(obj.status == true){
       
        localStorage.setItem("token", obj.token)
        localStorage.setItem("payload", JSON.stringify(obj.dados))
        window.location="site.html"

    }else{

        p.textContent = "login invalido"
        divResposta.appendChild(p)
    }

});
requisicao.catch((erro)=>{
    console.log(erro);
});


}