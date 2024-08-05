const mysql = require('mysql'); // Certifique-se de importar a biblioteca MySQL

module.exports = class Usuario {
    constructor(banco) {
        this._banco = banco;
        this._idUsuario = null;
        this._nomeUsuario = null;
        this._emailUsuario = null;
        this._senha = null;
        this._nascimento = null;
    }


    async Login() {
        const email = this._emailUsuario;
        const senha = this._senha;
        console.log("salve");
        console.log("email >>>>>>" + email)
        const parametro = [email, senha];
        
        const sql = 'SELECT idUsuario, nomeUsuario, emailUsuario, nascimento FROM usuario WHERE emailUsuario = ? AND senha = md5(?)';
    
        return new Promise((resolve, reject) => {
            this._banco.query(sql, parametro, (erro, resultado) => {
                if (erro) {
                    console.log("Erro: " + erro);
                    reject(erro);
                } else {
                    if (resultado.length > 0) {
                        const usuario = resultado[0];
                        const obj = {
                            status:true,
                            dados: {
                                idUsuario: usuario.idUsuario,
                                nomeUsuario: usuario.nomeUsuario,
                                emailUsuario: usuario.emailUsuario,
                                nascimento: usuario.nascimento
                            }
                        };
                        resolve(obj);
                    } else {
                        const obj = {
                            status: false,
                        };
                        resolve(obj);
                    }
                }
            });
        });
    }
    
    
    async create() {
        const operacao = new Promise((resolve, reject) => {
            const nome = this._nomeUsuario;
            const email = this._emailUsuario;
            const senha = this._senha;
            const nascimento = this._nascimento;

            const parametro = [nome, email, senha, nascimento];
            const sql = "INSERT INTO usuario (nomeUsuario, emailUsuario, senha, nascimento) VALUES (?,?, md5(?), ?);";

            this._banco.query(sql, parametro,function(erro, resultado) {
                if (erro) {
                    console.log("Erro: " + erro);
                    reject(erro);
                } else {
                    console.log("Cadastrado com sucesso!");
                    console.log(JSON.stringify(resultado))
                    resolve(JSON.stringify(resultado))

                }
            });
        });

        return operacao;
    }
    
    async update() {
        const operacao = new Promise((resolve, reject) => {
            const nome = this._nomeUsuario;
            const email = this._emailUsuario;
            const senha = this._senha;
            const nascimento = this._nascimento;
            const idUsuario = this._idUsuario;

            const parametro = [nome, email, senha, nascimento,idUsuario];
            const sql = "UPDATE usuario SET nomeUsuario = ?,  emailUsuario = ?, senha = ?, nascimento = ? WHERE idUsuario = ?;";

            this._banco.query(sql, parametro,function(erro, resultado) {
                if (erro) {
                    console.log("Erro: " + erro);
                    reject(erro);
                } else {
                    console.log("atualizado  com sucesso!");
                    console.log(JSON.stringify(resultado))
                    resolve(JSON.stringify(resultado))

                }
            });
        });

        return operacao;
    }
    

    async read() {
        const operacao = new Promise((resolve, reject) => {
            const parametro = [];
            const sql = "SELECT *from usuario order by nomeUsuario";

            this._banco.query(sql, parametro,function(erro, resultado) {
                if (erro) {
                    console.log("Erro: " + erro);
                    reject(erro);
                } else {
                    console.log("sucesso!");
                    console.log(JSON.stringify(resultado))
                    resolve(resultado)

                }
            });
        });

        return operacao;
    }

    async readById() {
        const operacao = new Promise((resolve, reject) => {
            const idUsuario  = this._idUsuario;
            console.log("idUsuario >>" + idUsuario)
            const parametro = [idUsuario];
            const sql = "SELECT * from usuario WHERE idUsuario = ?; ";

            this._banco.query(sql, parametro,function(erro, resultado) {
                if (erro) {
                    console.log("Erro: " + erro);
                    reject(erro);
                } else {
                    console.log("sucesso!");
                    console.log(JSON.stringify(resultado))
                    resolve(resultado)

                }
            });
        });

        return operacao;
    }
    async delete() {
        const operacao = new Promise((resolve, reject) => {
            const idUsuario  = this._idUsuario;
            console.log("idUsuario >>" + idUsuario)
            const parametro = [idUsuario];
            const sql = "DELETE from usuario WHERE idUsuario = ?; ";

            this._banco.query(sql, parametro,function(erro, resultado) {
                if (erro) {
                    console.log("Erro: " + erro);
                    reject(erro);
                } else {
                   resolve(resultado)
                }
            });
        });

        return operacao;
    }


    set banco(valor) {
        this._banco = valor;
    }

    get banco() {
        return this._banco;
    }

    set idUsuario(valor) {
        this._idUsuario = valor;
    }

    get idUsuario() {
        return this._idUsuario;
    }

    set nomeUsuario(valor) {
        this._nomeUsuario = valor;
    }

    get nomeUsuario() {
        return this._nomeUsuario;
    }

    set emailUsuario(valor) {
        this._emailUsuario = valor;
    }

    get emailUsuario() {
        return this._emailUsuario;
    }

    set senha(valor) {
        this._senha = valor;
    }

    get senha() {
        return this._senha;
    }

    set nascimento(valor) {
        this._nascimento = valor;
    }

    get nascimento() {
        return this._nascimento;
    }
}
