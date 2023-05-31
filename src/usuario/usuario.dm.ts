import { Injectable } from "@nestjs/common/decorators";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados {
    #usuarios: UsuarioEntity[] = [];

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){
        return this.#usuarios
    }

    async validaEmail(email: string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario!== undefined);
    }

}