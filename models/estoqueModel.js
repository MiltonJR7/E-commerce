
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true }
})

export default class EstoqueModel {

    #estID;
    #proID;
    #estQuantidade;
    #estMinimo;

    get estID() { return this.#estID; } set estID(value) { this.#estID = value; }
    get proID() { return this.#proID; } set proID(value) { this.#proID = value; }
    get estQuantidade() { return this.#estQuantidade; } set estQuantidade(value) { this.#estQuantidade = value; }
    get estMinimo() { return this.#estMinimo; } set estMinimo(value) { this.#estMinimo = value; }

    constructor(estID, proID, estQuantidade, estMinimo) {
        this.#estID = estID;
        this.#proID = proID;
        this.#estQuantidade = estQuantidade;
        this.#estMinimo = estMinimo;
    }

    async salvarEstoqueProduto() {

    }
}