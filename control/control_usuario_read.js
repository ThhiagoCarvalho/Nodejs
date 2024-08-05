const Usuario = require('../model/usuario');
const JWT = require('../model/JWT')

module.exports = function(request,response,banco){
    console.log("/GET ID: /usuarios");
        const auth = request.headers.authorization;
        const jwt = new JWT();
        const validou = jwt.validar(auth);

        if (validou.status == true){
            const p_idUsuario = request.params.idUsuario;
            const user = new Usuario(banco);
            user.idUsuario = p_idUsuario;

            user.read().then((respostaPromisse)=>{
                const resposta = {
                    status:true,
                    msg:"leitura feita com sucesso",
                    dados:respostaPromisse,
                    token : jwt.gerar(validou.payload)
                    
                }
                response.status(201).send(resposta);

            }).catch(erro =>{
                console.log("errro >>>" + erro);

                const resposta = {
                    status:false,
                    msg:"erro ao ler " 
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


    
