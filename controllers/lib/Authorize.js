const PGConnection = require('../../db/PGConnection.js');
import { EncryptionUtility } from '../../helper';

export default class Authorize {
  static async login(email, senha) {
    let usuario = "SELECT * FROM inline.usuario WHERE usuario.email = $1";
    var resp = (await PGConnection.query(usuario, [email])).rows[0];
    if (resp) {
      var isValid = EncryptionUtility.compare(senha, resp.senha);
      if (isValid) return ({
        token: EncryptionUtility.generateToken(resp, 'frangos'),
        success: true
      });
      else return ({
        error: "senha invalida",
        success: false
      });
    }
    else return ({
      error: "email nao encontrado",
      success: false
    });
  }
  static async newUser(body) {
    let usuario = "SELECT * FROM inline.usuario WHERE usuario.email = $1";
    var resp = (await PGConnection.query(usuario, [body.email])).rows[0];
    if (resp) {
      return ({
        error: "email em uso",
        success: false
      });
    }
    else {

    }
  }
}
