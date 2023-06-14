import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/produto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutosArmazenados } from "./produto.dm";
import { v4 as uuid} from "uuid";
import { ListaProdutoDTO } from "./dto/listaProduto.dto";
import { AlteraProdutoDTO } from "./dto/atualizaProduto.dto";
import { Delete } from "@nestjs/common/decorators";
import { EstoqueProdutoDTO } from "./dto/estoqueProduto.dto copy";

@Controller('/produtos')


export class ProdutoController{

    constructor(private clsProdutosArmazenados : ProdutosArmazenados ){
    }   

    @Get('/:nome')
    async buscaPorNome (@Param('nome') nome: string){
        const produtoAtualizado = await this.clsProdutosArmazenados.buscaPorNome(nome)
        return({
            produto: produtoAtualizado,
            message: 'Produto pesquisado por Nome'
        })
    }  

    @Get('/marca/:marca')
    async buscaMarca (@Param('marca') marca: string){
        const produtoAtualizado = await this.clsProdutosArmazenados.buscaMarca(marca)
        return({
            produto: produtoAtualizado,
            message: 'Produto pesquisado por Marca'
        })
    } 

    @Get('/cor/:cor')

    async buscaCor (@Param('cor') cor: string) {
        const listarProdutos = await this.clsProdutosArmazenados.Produtos;
        const produtosRetornados = listarProdutos.filter(
            element => (element.cor.find( e => e ===cor))
        ).map(
                produto => new ListaProdutoDTO(
                    produto.id,
                    produto.nome
            )
        );
        return produtosRetornados;
    }

    @Get('/medida/:medida')

    async buscaMedida (@Param('medida') medida: string) {
        const listarProdutos = await this.clsProdutosArmazenados.Produtos;
        const produtosRetornados = listarProdutos.filter(
            element => (element.medidas.find( e => e === medida))
        ).map(
                produto => new ListaProdutoDTO(
                    produto.id,
                    produto.nome
            )
        );
        return produtosRetornados;
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

    @Put('/controleEstoque/:id')

   async removerEstoque(@Param('id') id:string, @Body() quantidade: EstoqueProdutoDTO ){

    const  produtoAtualizado = await this.clsProdutosArmazenados.removeEstoque(id,quantidade);
    return ({
        produto: produtoAtualizado,
        message:'Valor de estoque foi retirado'
    });
   }

   @Put('/addEstoque/:id')

   async addEstoque(@Param('id') id:string, @Body() quantidade: EstoqueProdutoDTO ){

    const  produtoAtualizado = await this.clsProdutosArmazenados.addEstoque(id,quantidade);
    return ({
        produto: produtoAtualizado,
        message:'Valor de estoque foi somado'
    });
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



