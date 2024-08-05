const jwt = require('jsonwebtoken');

module.exports = class JWT{

    constructor(){
        this._jsonwebtoken = jwt;
        this._jwt_key = "0d9e8874bb0f2c6b28216f14823ad9f6";
        this._duracao = 60*60*300;  

    }

    gerar(payload){
        const novoToken = this._jsonwebtoken.sign(
            {payload:payload},
            this._jwt_key,
            {expiresIn:this._duracao}
        );
        return novoToken;
    }

    validar(token){
        token = this.limparEntrada(token);
        
        try{
        const payload = this._jsonwebtoken.verify(token,this._jwt_key);
        const resposta  = { 
            status : true,
            payload:payload
        }
        return resposta

        } catch (Erro){
            const resposta  = { 
                status : false,
                payload:{}
            }
            return resposta
        }
    }

    limparEntrada(token){
        const tokenArray = token.split(" ");
        token = tokenArray[1];
        token = token.replace("<","");
        token = token.replace(">","");
        return token;

    }
}