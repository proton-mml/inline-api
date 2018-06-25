const fs = require('fs');
const { Client } = require('pg');
const PGConnection = require('./PGConnection.js');

class Estabelecimento {
    static async getByEmail(email) {
        return (await PGConnection.query("SELECT * FROM inline.estabelecimento WHERE email = $1",
                                        [email])).rows[0];
    }
}

module.exports = Estabelecimento;
