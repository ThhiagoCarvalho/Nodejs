const Usuario = require('../model/usuario');
const JWT = require('../model/JWT')

module.exports = function(request,response,banco){
    console.log("/PUT : /usuarios");

    const auth = request.headers.authorization;
    const jwt = new JWT();
    const validou = jwt.validar(auth);


    if ( validou.status == true){
        const p_idUsuario =  request.params.idUsuario;
        const p_nomeUsuario = request.body.nomeUsuario;
        const p_emailUsuario = request.body.emailUsuario;
        const p_senha = request.body.senha;
        const p_nascimento = request.body.nascimento;


        if( p_nomeUsuario==""){
            const resposta = {
                status:false,
                msg:"o nome do usuario nao pode ser vazio"
            }
            response.status(200).send(resposta);
        }else{
            const user = new Usuario(banco);
            user.idUsuario = p_idUsuario;
            user.nomeUsuario = p_nomeUsuario;
            user.emailUsuario = p_emailUsuario;
            user.senha = p_senha;
            user.nascimento = p_nascimento;
            
            
            user.update().then((respostaPromisse)=>{
                const resposta = {
                    status:true,
                    msg:"atualizado com sucesso",
                    dados:{
                        idUsuario : respostaPromisse.insertId,
                        nomeUsuario : p_nomeUsuario,
                        emailUsuario : p_emailUsuario
                    }
                    
                }
                response.status(201).send(resposta);



            }).catch(erro =>{
                console.log("errro >>>" + erro);

                const resposta = {
                    status:false,
                    msg:"erro ao atualizar " 
                }
                response.status(201).send(resposta);

            });
        }
    }else{
            const resposta = {
                status:false,
                msg:"token invalido" 
            }
            response.status(201).send(resposta);

        }
}

    
