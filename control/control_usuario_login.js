const Usuario = require('../model/usuario');
const JWT = require('../model/JWT')


module.exports = function(request,response,banco){
    console.log("/LOGIN : /usuarios");

    const p_emailUsuario = request.body.emailUsuario;
    const p_senha = request.body.senha;

    if( p_emailUsuario==""){
        const resposta = {
            status:false,
            msg:"o email do usuario nao pode ser vazio"
        }
        response.status(200).send(resposta);

    }else{
        const usuario = new Usuario(banco);
        usuario.emailUsuario = p_emailUsuario;
        usuario.senha = p_senha;
        //user.create().then((respostaPromisse)=>{
        
        usuario.Login().then((respostaPromisse)=>{

            if(respostaPromisse.status == true){
                console.log("status >>>>>" + respostaPromisse.status)
                const jwt = new JWT();
                const token = jwt.gerar(respostaPromisse.dados);


                const resposta = {
                    status : true,
                    msg : 'sucesso',
                    dados : respostaPromisse.dados,
                    token: token
                }

                response.status(201).send(resposta);

            }else{
                const resposta = {
                    status : false,
                    msg : 'login invalido',
                }
                response.status(201).send(resposta);

            }
        });
    }
    
}

    
