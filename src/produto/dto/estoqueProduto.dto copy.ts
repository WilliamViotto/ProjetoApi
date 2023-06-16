import { IsOptional, IsNumber } from "class-validator";



export class EstoqueProdutoDTO{

    @IsNumber()
    estoque: number;

}