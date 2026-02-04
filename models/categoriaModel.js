
import "dotenv/config"
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true }
})

export default class CategoriaModel {

    #catID;
    #catNome;
    #catDescricao;

    get catID() { return this.#catID; } set catID(value) { this.#catID = value; }
    get catNome() { return this.#catNome; } set catNome(value) { this.#catNome = value; }
    get catDescricao() { return this.#catDescricao; } set catDescricao(value) { this.#catDescricao = value; }

    constructor(catID, catNome, catDescricao) {
        this.#catID = catID;
        this.#catNome = catNome;
        this.#catDescricao = catDescricao;
    }

    async listarCategorias() {
        const client = await pool.connect();

        try {
            const sql = "select * from tb_categoria";
            
            const result = await client.query(sql);
            const rows = result.rows;

            let listaCategorias = [];

            for(let i = 0; i < rows.length; i++) {
                let categorias = new CategoriaModel();
                categorias.catID = rows[i].cat_id;
                categorias.catNome = rows[i].cat_nome;
                categorias.catDescricao = rows[i].cat_descricao;

                listaCategorias.push(categorias);
            }            

            return listaCategorias;
        } finally {
            client.release();
        }
    }
}