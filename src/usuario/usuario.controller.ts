import { Body, Controller, Get, Post } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import { v4 as uuid} from "uuid";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";

@Controller('/usuarios')


export class UsuarioController{

    constructor(private clsUsuariosArmazenados : UsuariosArmazenados ){
    }   


    @Get()
    async RetornoUsuarios(){
        const usuariosListados = await this.clsUsuariosArmazenados.Usuarios;
        const listaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );

        return listaRetorno;
    }



    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO){

        var usuario = new UsuarioEntity (uuid(),dadosUsuario.nome,dadosUsuario.idade,dadosUsuario.cidade,dadosUsuario.email,dadosUsuario.telefone,dadosUsuario.senha)

        var retornoUsuario;
        
        this.clsUsuariosArmazenados.AdicionarUsuario(usuario);
        retornoUsuario={
            id: usuario.id,
            message: "Usuário Criado"
        }

        return retornoUsuario;
    }
}
