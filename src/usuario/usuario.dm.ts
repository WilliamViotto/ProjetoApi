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

    async atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if (!possivelUsuario){
            throw new Error ('Usuário não encontrado');
        }

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id'){
                    return;
                }

                possivelUsuario[chave] = valor;
            }
            )
            
        return possivelUsuario;
    }

}