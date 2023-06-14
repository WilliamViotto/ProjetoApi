import { Injectable } from "@nestjs/common/decorators";
import { EstoqueProdutoDTO } from "./dto/estoqueProduto.dto copy";
import { ProdutoEntity } from "./produto.entity";


@Injectable()
export class ProdutosArmazenados {
    #produtos: ProdutoEntity[] = [];

    AdicionarProduto(produto: ProdutoEntity){
        this.#produtos.push(produto);
    }

    get Produtos(){
        return this.#produtos
    }


    private buscaPorID(id: string){
        const possivelProduto = this.#produtos.find(
            produtoSalvo => produtoSalvo.id === id
        );

        if (!possivelProduto){
            throw new Error('Produto não encontrado')
        }
        return possivelProduto
    }



    async buscaPorNome (nome: string){
        const possivelProduto = this.#produtos.find(
            produtoSalvo => produtoSalvo.nome === nome
        );

        if (!possivelProduto){
            throw new Error('Produto não encontrado')
        }
        return possivelProduto
    }

    async buscaMarca (marca: string){
        const possivelProduto = this.#produtos.find(
            produtoSalvo => produtoSalvo.marca === marca
        );

        if (!possivelProduto){
            throw new Error('Produto não encontrado')
        }
        return possivelProduto
    }

    async removeEstoque( id: string, quantidade: EstoqueProdutoDTO){

        const produtoEstoqueAtualizado = this.buscaPorID(id);

        produtoEstoqueAtualizado.estoque = produtoEstoqueAtualizado.estoque - quantidade.estoque;

    }

    async addEstoque( id: string, quantidade: EstoqueProdutoDTO){

        const produtoEstoqueAtualizado = this.buscaPorID(id);

        produtoEstoqueAtualizado.estoque = produtoEstoqueAtualizado.estoque + quantidade.estoque;

    }









    async atualizaProduto(id: string, dadosAtualizacao: Partial<ProdutoEntity>){
        const produto = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id'){
                    return;
                }

                produto[chave] = valor;
            }
            )

        return produto;
    }
    
    async removeProduto(id: string){
        const produto = this.buscaPorID(id);

        this.#produtos = this.#produtos.filter(
            produtoSalvo => produtoSalvo.id !== id
        )

        return produto;
    }

}