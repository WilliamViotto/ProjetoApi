import { IsNotEmpty, IsString, IsEmail, MinLength, IsInt, IsOptional } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class AlteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsEmail(undefined,{message: "Email invalido"})
    @EmailUnico({message: "Já existe usuário com este email cadastrado"})
    @IsOptional()
    email: string;

    @MinLength(6,{message: "Tamanho da senha inválido"})
    @IsOptional()
    senha: string;

    @IsInt({message:"Idade inválida"})
    @IsOptional()
    idade: BigInteger;

    @IsString({message: "Cidade inválida"})
    @IsOptional()
    cidade: string;

    @IsString({message: "Telefone inválido"})
    @IsOptional()
    telefone: string;

}