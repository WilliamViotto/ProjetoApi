import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsNumber, IsArray } from "class-validator";



export class AlteraProdutoDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsBoolean({message: "Status inválido"})
    @IsOptional()
    ativo: boolean;

    @IsNumber()
    @IsOptional()
    valor: number;

    @IsNumber()
    @IsOptional()
    estoque: number;

    @IsArray({message: "Medida inválida"})
    @IsOptional()
    medidas: string[];

    @IsArray({message: "Cor inválida"})
    @IsOptional()
    cor: string[];

    @IsString({message: "Marca inválida"})
    @IsOptional()
    marca: string;

}