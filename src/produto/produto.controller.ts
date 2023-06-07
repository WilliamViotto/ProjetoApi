import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/produto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutosArmazenados } from "./produto.dm";
import { v4 as uuid} from "uuid";
import { ListaProdutoDTO } from "./dto/listaProduto.dto";
import { AlteraProdutoDTO } from "./dto/atualizaProduto.dto";
import { Delete } from "@nestjs/common/decorators";

@Controller('/produtos')


export class ProdutoController{

    constructor(private clsProdutosArmazenados : ProdutosArmazenados ){
    }   


    @Get()
    async RetornoProduto(){
        const produtosListados = await this.clsProdutosArmazenados.Produtos;
        const listaRetorno = produtosListados.map(
            produto => new ListaProdutoDTO(
                produto.id,
                produto.nome
            )
        );

        return listaRetorno;
    }



    @Post()
    async criaProduto(@Body() dadosProduto: CriaProdutoDTO){

        var produto = new ProdutoEntity (uuid(), dadosProduto.nome, dadosProduto.ativo, dadosProduto.estoque, dadosProduto.valor, dadosProduto.medidas, dadosProduto.cor, dadosProduto.marca)

        var retornoProduto;
        
        this.clsProdutosArmazenados.AdicionarProduto(produto);
        retornoProduto={
            id: produto.id,
            message: "Produto Criado"
        }

        return retornoProduto;
    }



    @Put('/:id')
    async atualizaProduto (@Param('id') id: string, @Body() novosDados: AlteraProdutoDTO){
        const produtoAtualizado = await this.clsProdutosArmazenados.atualizaProduto(id, novosDados)
        return({
            produto: produtoAtualizado,
            message: 'Produto atualizado'
        })

    }    
    
    @Delete('/:id')
    async removeProduto(@Param('id') id: string){
        const produtoRemovido = await this.clsProdutosArmazenados.removeProduto(id);
        return({
            produto: produtoRemovido,
            message: 'Produto removido'
        })
    }

}
