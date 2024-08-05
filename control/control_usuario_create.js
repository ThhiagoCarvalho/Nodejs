const Usuario = require('../model/usuario');
const JWT = require('../model/JWT')



module.exports = function(request,response,banco){
    console.log("/POST : /usuarios");
   

    console.log("Request Body:", request.body);
    console.log("Request Headers:", request.headers);
    
    const auth = request.headers.authorization;
    const jwt = new JWT();
    const validou = jwt.validar(auth)

    if (validou.status == true){
        const p_nomeUsuario = request.body.nomeUsuario;
        const p_emailUsuario = request.body.emailUsuario;
        const p_senha = request.body.senha;
        const p_nascimento = request.body.nascimento;
        console.log("CREATE >>> " )
        console.log("nome >>> " + p_nomeUsuario)
        console.log("email >>> " + p_emailUsuario)
        console.log("senha >>> " + p_senha)

        if( p_nomeUsuario==""){
            const resposta = {
                status:false,
                msg:"o nome do cargo nao pode ser vazio"
            }
            response.status(200).send(resposta);
        }else{
            const user = new Usuario(banco);
            
            user.nomeUsuario = p_nomeUsuario;
            user.emailUsuario = p_emailUsuario;
            user.senha = p_senha;
            user.nascimento = p_nascimento;
            
            
            user.create().then((respostaPromisse)=>{
                const resposta = {
                    status:true,
                    msg:"cadastrado com sucesso",
                    dados:{
                        idUsuario : respostaPromisse.insertId,
                        nomeUsuario : p_nomeUsuario,
                        emailUsuario : p_emailUsuario,
                        token : jwt.gerar(validou.payload)
                    }
                    
                }
                response.status(201).send(resposta);

            }).catch(erro =>{
                console.log("errro >>>" + erro);

                const resposta = {
                    status:false,
                    msg:"erro ao cadastrar " 
                }
                response.status(201).send(resposta);

            });
        }
    }else{
        const resposta = {
            status:false,
            msg:"TOKEN INVALIDO " 
        }
        response.status(201).send(resposta);
    }
    return;
}

    
