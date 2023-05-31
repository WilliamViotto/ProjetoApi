

export class UsuarioEntity{
    id: string;
    nome: String;
    idade: BigInteger;
    cidade: String;
    email: String;
    telefone: String;
    #senha: String;

    constructor(id:string,nome: String,idade: BigInteger,cidade: String,email: String,telefone: String,senha: String){
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