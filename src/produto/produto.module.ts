import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutosArmazenados } from "./produto.dm";



@Module({
    controllers:[ProdutoController],
    providers:[ProdutosArmazenados]
})
export class ProdutoModule{
}