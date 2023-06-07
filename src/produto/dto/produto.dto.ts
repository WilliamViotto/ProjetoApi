import { IsNotEmpty, IsString, IsInt, IsBoolean, IsNumber, IsArray } from "class-validator";


export class CriaProdutoDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsBoolean({message: "Status inválido"})
    ativo: boolean;

    @IsNumber()
    valor: number;

    @IsNumber()
    estoque: number;

    @IsArray({message: "Medida Inválida"})
    medidas: string[];

    @IsArray({message: "Cor inválida"})
    cor: string[];

    @IsString({message: "Marca Inválida"})
    marca: string;

}