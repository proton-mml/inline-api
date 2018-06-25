const fs = require('fs');
const { Client } = require('pg');
const PGConnection = require('./PGConnection.js');

class ClienteCadastrado {

    static async getByEmail(email) {
        // var query = {
        //     text: "SELECT * FROM inline.usuario, inline.cliente_cadastrado, inline.cliente WHERE usuario.email = $1 AND cliente_cadastrado.email = $1 AND cliente.id = cliente_cadastrado.id_cliente",
        //     values: [email]
        // };

        // const client = new Client();
        // await client.connect();
        // var clienteCadastrado = (await client.query(query)).rows[0];
        // client.end();
        // return clienteCadastrado;
        return (await PGConnection.query("SELECT * FROM inline.usuario, inline.cliente_cadastrado, inline.cliente WHERE usuario.email = $1 AND cliente_cadastrado.email = $1 AND cliente.id = cliente_cadastrado.id_cliente",
                                        [email])).rows[0];
    }
}
module.exports = ClienteCadastrado;


