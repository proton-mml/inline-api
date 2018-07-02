const PGConnection = require('../../db/PGConnection.js');
import { EncryptionUtility } from '../../helper';

export default class ClienteCadastrado {

    static async getByEmail(email) {
        return (await PGConnection.query("SELECT * FROM inline.usuario, inline.cliente_cadastrado, inline.cliente WHERE usuario.email = $1 AND cliente_cadastrado.email = $1 AND cliente.id = cliente_cadastrado.id_cliente",
                                        [email])).rows[0];
    }

    static async getByClienteId(id_cliente) {
        return (await PGConnection.query("SELECT * FROM inline.usuario, inline.cliente_cadastrado, inline.cliente WHERE usuario.email = cliente_cadastrado.email AND cliente.id = cliente_cadastrado.id_cliente AND cliente.id = $1",
                                        [id_cliente])).rows[0];
    }

    static async insert (nome, email, celular, prioridade, senha) {
        let encrypted = EncryptionUtility.hash(senha);
        let usuario = "SELECT * FROM inline.usuario WHERE usuario.email = $1";
        let query_usuario = "INSERT INTO inline.usuario(nome, tipo, email, senha) VALUES ($1, 'cliente cadastrado', $2, $3)";
        let query_cliente = "INSERT INTO inline.cliente(telefone_celular, tipo_prioridade) VALUES ($1, $2)";
        let query_cliente_cadastrado = "INSERT INTO inline.cliente_cadastrado(email, id_cliente) VALUES ($1, $2)";

        var resp = (await PGConnection.query(usuario, [email])).rows[0];
        if (resp) {
          return ({
            error: "email em uso",
            success: false
          });
        }

        let Conn = (await PGConnection.newConnection());

        try {
            await Conn.query('BEGIN');
            await Conn.query(query_usuario, [nome, email, encrypted]);
            await Conn.query(query_cliente, [celular, prioridade]);
            let user = (await Conn.query("SELECT id FROM inline.cliente WHERE tipo_prioridade = $1 and telefone_celular = $2", [prioridade, celular]));
            await Conn.query(query_cliente_cadastrado, [email, user.rows[0].id]);
            await Conn.query('COMMIT');
            await Conn.end();
        } catch (e) {
            await Conn.query('ROLLBACK');
            await Conn.end();
            return ({
              error: e,
              success: false
            });

        }
        resp = (await PGConnection.query(usuario, [email])).rows[0];
        return ({
          user: resp,
          success: true,
          token: EncryptionUtility.generateToken(resp, 'frangos')
        });
    }

    static async deleteByEmail (email) {
        let query_usuario = "DELETE FROM inline.usuario WHERE email = $1";
        let query_cliente = "DELETE FROM inline.cliente WHERE id = $1";
        let query_cliente_cadastrado = "DELETE FROM inline.cliente_cadastrado WHERE email = $1";

        let Conn = (await PGConnection.newConnection());

        try {
            await Conn.query('BEGIN');
            let cc = (await Conn.query("SELECT id_cliente FROM inline.cliente_cadastrado WHERE email = $1", [email]));
            await Conn.query(query_cliente, [cc.rows[0].id]);
            await Conn.query(query_cliente_cadastrado, [email]);
            await Conn.query(query_usuario, [email]);
            await Conn.query('COMMIT');
            await Conn.end();
        } catch (e) {
            await Conn.query('ROLLBACK');
            await Conn.end();
            return {success: false, error: e};
        }
        return {success: true};
    }

}
