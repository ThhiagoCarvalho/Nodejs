const Usuario = require('../model/usuario');
const JWT = require('../model/JWT')


module.exports = function(request,response,banco){
    console.log("/DELETE: /usuarios");

        const auth = request.headers.authorization;
        const jwt = new JWT();
        const validou = jwt.validar(auth);

        if (validou.status == true){

            const p_idUsuario = request.params.idUsuario;
            const user = new Usuario(banco);
            user.idUsuario = p_idUsuario;

            
            user.delete().then((respostaPromisse)=>{
                const resposta = {
                    status:true,
                    msg:"delete feito com sucesso" 
                }
                response.status(201).send(resposta);
            response.status(200);

            }).catch(erro =>{
                console.log("errro >>>" + erro);

                const resposta = {
                    status:false,
                    msg:"erro ao deletar " 
                }
                response.status(201).send(resposta);

            });
        }else{
            const resposta = {
                status:false,
                msg:"token invalido" 
            }
            response.status(201).send(resposta);

        }
    }


    
