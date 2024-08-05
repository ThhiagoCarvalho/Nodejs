const { response } = require("express")
const Usuario = require('../model/usuario');
const controle_UsuarioReadID = require('../control/control_usuario_readByID');

const controle_UsuarioRead = require('../control/control_usuario_read');
const controle_usuarioCreate = require('../control/control_usuario_create');
const controle_usuarioDelete = require('../control/control_usuario_delete');
const controle_usuarioUpdate = require('../control/control_usuario_update');
const controle_usuarioLogin = require('../control/control_usuario_login');
module.exports = function(app,banco){


    app.post("/login",(request,response)=>{
        controle_usuarioLogin(request,response,banco)
     });

    app.post("/usuariosss",(request,response)=>{
       controle_usuarioCreate(request,response,banco)
    });
    app.put("/usuariosss/:idUsuario",(request,response)=>{
        controle_usuarioUpdate(request,response,banco)
     });

    app.get("/usuariosss",(request,response)=>{
        controle_UsuarioRead(request,response,banco)
    });
    app.get("/usuariosss/:idUsuario",(request,response)=>{
        controle_UsuarioReadID(request,response,banco)
    });
    app.delete("/usuariosss/:idUsuario",(request,response)=>{
        controle_usuarioDelete(request,response,banco)
    });
}