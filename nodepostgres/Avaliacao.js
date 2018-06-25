const fs = require('fs');
const { Client } = require('pg');
const PGConnection = require('./PGConnection.js');

class Avaliacao {
    static async getByEmailEstabelecimento(email_estabelecimento) {
        var query = "SELECT * FROM inline.avaliacao WHERE email_estabelecimento = $1";
        var avaliacoes = (await PGConnection.query(query, [email_estabelecimento])).rows;

        return avaliacoes;
    }

    static async insert(estrelas,
                        comentario,
                        email_estabelecimento,
                        email_client) {
        var query = "INSERT INTO inline.avaliacao(estrelas, comentario, email_estabelecimento, email_cliente) VALUES ($1, $2, $3, $4)";
        await PGConnection.query(query, [estrelas, comentario, email_estabelecimento, email_client]);
    }

    static async deleteById(id) {
        var query =  "DELETE FROM inline.avaliacao WHERE id = $1";
        await PGConnection.query(query, [id]);
    }
}

module.exports = Avaliacao;
