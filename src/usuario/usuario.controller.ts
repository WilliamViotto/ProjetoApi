import { Body, Controller, Get, Post } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import { v4 as uuid} from "uuid";

@Controller('/usuarios')


export class UsuarioController{

    constructor(private clsUsuariosArmazenados : UsuariosArmazenados ){
    }   


    @Get()
    async RetornoUsuarios(){
        return this.clsUsuariosArmazenados.Usuarios;
    }



    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO){

        var usuario = new UsuarioEntity (uuid(),dadosUsuario.nome,dadosUsuario.idade,dadosUsuario.cidade,dadosUsuario.email,dadosUsuario.telefone,dadosUsuario.senha)

        var retornoUsuario;
        
        this.clsUsuariosArmazenados.AdicionarUsuario(usuario);
        retornoUsuario={
            dadosUsuario,
            status: "Usuário Criado"
        }

        return retornoUsuario;
    }
}
