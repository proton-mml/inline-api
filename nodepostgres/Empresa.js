const fs = require('fs');
const { Client } = require('pg');
const PGConnection = require('./PGConnection.js');

class Empresa {
    static async getByEmail(email) {
        var empresa_query = "SELECT * FROM inline.usuario, inline.empresa WHERE usuario.email = $1 AND empresa.email = usuario.email";
        var enderecos_query = "SELECT * FROM inline.endereco WHERE id = $1";
        var estabelecimentos_query = "SELECT * FROM inline.estabelecimento WHERE email_empresa = $1";
        
        var empresa = (await PGConnection.query(empresa_query, [email])).rows[0];
        empresa.endereco = (await PGConnection.query(enderecos_query, [empresa.id_endereco])).rows[0];
        empresa.estabelecimentos = (await PGConnection.query(estabelecimentos_query, [email])).rows;

        return empresa;
    }

}

module.exports = Empresa;

