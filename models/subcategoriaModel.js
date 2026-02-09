
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true }
});

export default class SubcategoriaModel {
    #subID;
    #subNome
    #catID;

    get subID() { return this.#subID; } set subID(value) { this.#subID = value; }
    get subNome() { return this.#subNome; } set subNome(value) { this.#subNome = value; }
    get catID() { return this.#catID; } set catID(value) { this.#catID = value; }

    constructor(subID, subNome, catID) {
        this.#subID = subID;
        this.#subNome = subNome;
        this.#catID = catID;
    }

    async listarSubcategorias() {
        const client = await pool.connect();

        try {
            const sql = "select * from tb_subcategoria";

            const result = await client.query(sql);
            const rows = result.rows;
            let lista = [];

            for(let i = 0; i < rows.length; i++) {
                let subcateg = new SubcategoriaModel();
                subcateg.subID = rows[i].sub_id;
                subcateg.subNome = rows[i].sub_nome;
                subcateg.catID = rows[i].cat_id;
                lista.push(subcateg);
            }

            return lista;
        } finally {
            client.release();
        }
    }

    toJSON() {
        return {
            subID: this.#subID,
            subNome: this.#subNome,
            catID: this.#catID
        };
    }
}