

export class UsuarioEntity{
    id: string;
    nome: string;
    idade: BigInteger;
    cidade: string;
    email: string;
    telefone: string;
    #senha: string;

    constructor(id:string,nome: string,idade: BigInteger,cidade: string,email: string,telefone: string,senha: string){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
        this.#senha = senha;        
    }   

    
    get senha(){
        return '**********'
    }

    set senha(senhanova){
        this.#senha = senhanova;
    }
}