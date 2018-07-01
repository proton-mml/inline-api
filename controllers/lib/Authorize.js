const PGConnection = require('../../db/PGConnection.js');
import { EncryptionUtility } from '../../helper';

export default class Authorize {
  static async validate(token) {
    const validation = EncryptionUtility.validateToken(token, 'frangos');
    if (validation.error) return ({success:false, error: 'token invalido'});
    return { success: true, user:validation.decoded, token:token }

  }
  static async login(email, senha) {
    let usuario = "SELECT * FROM inline.usuario WHERE usuario.email = $1";
    var resp = (await PGConnection.query(usuario, [email])).rows[0];
    if (resp) {
      var isValid = EncryptionUtility.compare(senha, resp.senha);
      if (isValid) return ({
        user:resp,
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
}
