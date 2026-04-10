

import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true }
});

export default class ItensVendasModel {
    #itvID;
    #itvQuantidade;
    #itvPrecoUnitario;
    #venID;
    #proID;

    get itvID() { return this.#itvID; } set itvID(value) { this.#itvID = value; }
    get itvQuantidade() { return this.#itvQuantidade; } set itvQuantidade(value) { this.#itvQuantidade = value; }
    get itvPrecoUnitario() { return this.#itvPrecoUnitario; } set itvPrecoUnitario(value) { this.#itvPrecoUnitario = value; }
    get venID() { return this.#venID; } set venID(value) { this.#venID = value; }
    get proID() { return this.#proID; } set proID(value) { this.#proID = value; }

    constructor(itvID, itvQuantidade, itvPrecoUnitario, venID, proID) {
        this.#itvID = itvID;
        this.#itvQuantidade = itvQuantidade;
        this.#itvPrecoUnitario = itvPrecoUnitario;
        this.#venID = venID;
        this.#proID = proID;
    }

    async registrarItensVendas(client, venID, dados) {
        let values = [];
        for(let i = 0; i < dados.carrinho.length; i++) {
            values.push(
                dados.carrinho[i].quantidade,
                dados.carrinho[i].preco,
                venID,
                dados.carrinho[i].id
            );
        }
        const sql = `
            insert into tb_item_venda
            (itv_quantidade, itv_preco_unitario, ven_id, pro_id)
            values ${dados.carrinho.map((_, i) => 
                `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4})`
            ).join(', ')}
        `;
        await client.query(sql, values);
    }

    async listarVendas(id) {
        const client = await pool.connect();

        try {
            const sql = `
                SELECT 
                    iv.itv_quantidade,
                    iv.ven_id,
                    v.ven_data,
                    v.ven_valor,
                    v.ven_forma_pagamento,
                    v.ven_status,
                    v.usu_id
                FROM 
                    tb_item_venda AS iv
                INNER JOIN
                    tb_venda AS v
                ON
                    iv.ven_id = v.ven_id
                WHERE
                    v.usu_id = $1
            `;

            const rows = await client.query(sql, [id]);
            const result = rows.rows;
            
            if(result) return result;
            return null;
        } finally {
            client.release();
        }
    }
}