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


    async filasEmail(query) {
        console.log(query);
        const promise = await this.fila.getAll(query = {id_estabelecimento: query.email});
        return promise.result;
    }
}
