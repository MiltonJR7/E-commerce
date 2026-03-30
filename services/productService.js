
import 'dotenv/config';
import { Pool } from "pg";
import ProductModel from "../models/productModel.js";
import EstoqueModel from "../models/estoqueModel.js";
import VendaShopModel from '../models/vendaShopModel.js';
import ItensVendasModel from '../models/itensVendasModel.js';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true }
})

export default class ProductService {

    async joinProductInStock(dados, imagem) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            const productModel = new ProductModel();
            const estoqueModel = new EstoqueModel();

            dados.imagem = imagem;

            const produto = await productModel.cadastrarProduto(client, dados);
            await estoqueModel.criarEstoqueInicial(client, produto.proID, dados);

            await client.query('COMMIT');

            return produto.proID;
        } catch(err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async alterTablesProductInStock(dados, imagem, id) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const productModel = new ProductModel();
            const estoqueModel = new EstoqueModel();
            dados.imagem = imagem;

            await productModel.alterarProduto(client, dados, id);
            await estoqueModel.alterarEstoque(client, dados, id);

            await client.query('COMMIT');
        } catch(err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async saveSaleWithItems(dados) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const vendaShopModel = new VendaShopModel();
            const itensVendasModel = new ItensVendasModel();

            const venda = await vendaShopModel.registrarVenda(client, dados);
            await itensVendasModel.registrarItensVendas(client, venda.venID, dados);

            await client.query('COMMIT');

            return venda.venID;
        } catch(err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}