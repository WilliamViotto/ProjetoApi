import { IsNotEmpty, IsString, IsEmail, MinLength, IsInt } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class CriaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsEmail(undefined,{message: "Email invalido"})
    @EmailUnico({message: "Já existe usuário com este email cadastrado"})
    email: string;

    @MinLength(6,{message: "Tamanho da senha inválido"})
    senha: string;

    @IsInt({message:"Idade inválida"})
    idade: BigInteger;

    @IsString({message: "Cidade inválida"})
    cidade: string;

    @IsString({message: "Telefone inválido"})
    telefone: string;

}