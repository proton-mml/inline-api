import { EncryptionUtility } from '../../helper';

export default class Filas {
    constructor(jwtsecret, fila) {
        this.jwtsecret = jwtsecret;
		this.fila = fila;

		this.todasFilas = this.todasFilas.bind(this);

    }
    async todasFilas(query) {
		const promise = await this.fila.getAll();
        return promise.result;
    }


    async filasAtivasEmail(email) {
        const promise = await this.fila.getAll({id_estabelecimento: email,
                                                        // data_hora_fim: {$gt: new Date()}
                                                       });

        return {success: true, answer: promise.result};
    }

    async filasId(id) {
        const promise = await this.fila.findOne({_id: id});
        return {success: true, answer: promise.result};
    }
}
