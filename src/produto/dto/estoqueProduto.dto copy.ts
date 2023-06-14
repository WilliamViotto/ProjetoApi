import { IsOptional, IsNumber } from "class-validator";



export class EstoqueProdutoDTO{

    @IsNumber()
    @IsOptional()
    estoque: number;

}