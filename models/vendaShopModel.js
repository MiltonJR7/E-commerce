

import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true }
});

export default class VendaShopModel {
    #venID;
    #venData;
    #venValor;
    #venFormaPagamento;
    #venStatus;
    #usuID;

    get venID() { return this.#venID; } set venID(value) { this.#venID = value; }
    get venData() { return this.#venData; } set venData(value) { this.#venData = value; }
    get venValor() { return this.#venValor; } set venValor(value) { this.#venValor = value; }
    get venFormaPagamento() { return this.#venFormaPagamento; } set venFormaPagamento(value) { this.#venFormaPagamento = value; }
    get venStatus() { return this.#venStatus; } set venStatus(value) { this.#venStatus = value; }
    get usuID() { return this.#usuID; } set usuID(value) { this.#usuID = value; }

    constructor(venID, venData, venValor, venFormaPagamento, venStatus, usuID) {
        this.#venID = venID;
        this.#venData = venData;
        this.#venValor = venValor;
        this.#venFormaPagamento = venFormaPagamento;
        this.#venStatus = venStatus;
        this.#usuID = usuID;
    }

    async registrarVenda(client, dados) {
        const sql = `
            insert into tb_venda
            (ven_valor, ven_forma_pagamento, usu_id)
            values ($1, $2, $3)
            returning
            ven_id, ven_status
        `;
        let somar = 0;

        for(let i = 0; i < dados.carrinho.length; i++) {
            somar += dados.carrinho[i].preco * dados.carrinho[i].quantidade;
            somar += 29.99 * dados.carrinho[i].quantidade;
        }

        const values = [
            somar,
            dados.pagamento,
            dados.usuarioID
        ];

        const { rows } = await client.query(sql, values);
        const row = rows[0];

        if(!row) return null;

        return {
            venID: row.ven_id,
            venStatus: row.ven_status
        }
    }
}