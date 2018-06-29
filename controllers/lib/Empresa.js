const PGConnection = require('../../db/PGConnection.js');
import { EncryptionUtility } from '../../helper';

export default class Empresa {
    static async getByEmail(email) {
        let empresa_query = "SELECT * FROM inline.usuario, inline.empresa WHERE usuario.email = $1 AND empresa.email = usuario.email";
        let enderecos_query = "SELECT * FROM inline.endereco WHERE id = $1";
        var empresa = (await PGConnection.query(empresa_query, [email])).rows[0];
        if (empresa) empresa.endereco = (await PGConnection.query(enderecos_query, [empresa.id_endereco])).rows[0];
        return {success: true, answer: empresa};
    }

    static async insert(nome, email, cnpj, endereco, senha) {
        let query_usuario = "INSERT INTO inline.usuario(nome, tipo, email, senha) VALUES ($1, 'empresa', $2, $3)";
        let query_empresa = "INSERT INTO inline.empresa(email, cnpj, id_endereco) VALUES ($1, $2, $3)";
        let query_endereco = "INSERT INTO inline.endereco(estado, cidade, logradouro, numero, complemento) VALUES ($1, $2, $3, $4, $5)";
        let query_get_endereco = "SELECT id FROM inline.endereco WHERE estado = $1 AND cidade = $2 AND logradouro = $3 AND numero = $4 AND complemento = $5";

        let Conn = (await PGConnection.newConnection());

        try {
            await Conn.query('BEGIN');
            await Conn.query(query_usuario, [nome, email, senha]);
            let end = await Conn.query(query_get_endereco, endereco);
            if (end.rows.length == 0) {
                await Conn.query(query_endereco, endereco);
                end = await Conn.query(query_get_endereco, endereco);
            }
            await Conn.query(query_empresa, [email, cnpj, end.rows[0].id]);
            await Conn.query('COMMIT');
            await Conn.end();
        } catch (e) {
            await Conn.query('ROLLBACK');
            await Conn.end();
            return {success: false, answer: e};
        }
        return {success: true};
    }

    static async deleteByEmail (email) {
        let query_usuario = "DELETE FROM inline.usuario WHERE email = $1";
        let query_empresa = "DELETE FROM inline.empresa WHERE email = $1";
        let query_endereco = "DELETE FROM inline.endereco WHERE id = $1";

        let Conn = (await PGConnection.newConnection());
        try {
            await Conn.query('BEGIN');
            let end = await Conn.query("SELECT id_endereco FROM inline.empresa WHERE email = $1", [email]);
            await Conn.query(query_empresa, [email]);
            await Conn.query(query_usuario, [email]);
            try { await Conn.query (query_endereco, [end.rows[0].id]); }
            catch(e) {console.log("Empresa removida mas endereco está sendo usado por outra empresa/estabelecimento, portanto não será removido.")}
            await Conn.query('COMMIT');
            await Conn.end();
        } catch (e) {
            await Conn.query('ROLLBACK');
            await Conn.end();
            return {success: true, answer: e};
        }
        return {success: true};
    }

    static async getAll(token) {
        const validation = EncryptionUtility.validateToken(token, 'frangos');
        if (validation.error) return ({success:false, error: 'token invalido'});

        let query_empresas = "SELECT usuario.nome, empresa.email FROM inline.usuario INNER JOIN inline.empresa ON usuario.email = empresa.email";
        var empresas = (await PGConnection.query(query_empresas, [])).rows;
        return {success: true, answer: empresas};
    }
}
