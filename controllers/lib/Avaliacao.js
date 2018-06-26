const PGConnection = require('../../db/PGConnection.js');

export default class Avaliacao {
    static async getByEmailEstabelecimento(email_estabelecimento) {
        let query = "SELECT * FROM inline.avaliacao WHERE email_estabelecimento = $1";
        return (await PGConnection.query(query, [email_estabelecimento])).rows;
    }

    static async getByEmailCliente(email_cliente) {
        let query = "SELECT * FROM inline.avaliacao WHERE email_cliente = $1";
        return (await PGConnection.query(query, [email_cliente])).rows;
    }

    static async getById(id) {
        let query = "SELECT * FROM inline.avaliacao WHERE id = $1";
        return (await PGConnection.query(query, [id])).rows;
    }

    static async insert(estrelas, comentario, email_estabelecimento, email_client) {
        let query = "INSERT INTO inline.avaliacao(estrelas, comentario, email_estabelecimento, email_cliente) VALUES ($1, $2, $3, $4)";
        await PGConnection.query(query, [estrelas, comentario, email_estabelecimento, email_client]);
    }

    static async deleteById(id) {
        let query =  "DELETE FROM inline.avaliacao WHERE id = $1";
        await PGConnection.query(query, [id]);
    }

    static async deleteByEmailCliente(email_cliente) {
        let query =  "DELETE FROM inline.avaliacao WHERE email_cliente = $1";
        await PGConnection.query(query, [email_cliente]);
    }
}
