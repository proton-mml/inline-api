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
        const promise = await this.fila.getAll({id_estabelecimento: email, data_hora_fim: {$gt: new Date()}});
        return {success: true, answer: promise.result};
    }

    async filasId(id) {
        const promise = await this.fila.findOne({_id: id});
        let resp = promise.result;
        if (resp.cronologica) {resp.cronologica = true; resp.agendada = false;}
        else {resp.cronologica = false; resp.agendada = true;}
        return {success: true, answer: resp};
    }

    async clientPosition(id_fila, cliente) {
        const fila = (await this.fila.findOne({_id: id_fila})).result;
        if (!fila) return {success: false, error: "Fila inexistente"};
        if (fila.cronologica) {
            for (let i = 0; i < fila.cronologica.entradas.length; i++) {
                if (fila.cronologica.entradas[i].id_cliente == cliente) return {success: true, answer: {posicao: fila.cronologica.entradas[i].posicao}};
            }
            return {success: true, answer: {posicao: undefined}}
        } else return {success: false, error: "Fila agendada não suportada ainda."};
    }

    async entrar(id_fila, cliente, preferencial, premium) {
        const fila = (await this.fila.findOne({_id: id_fila})).result;
        if (!fila) return {success: false, error: "Fila inexistente"};
        if ((new Date(fila.data_hora_inicio)) < (new Date()) &&
            (new Date (fila.data_hora_fim)) > (new Date())) {
            if (fila.cronologica) {
                for (let i = 0; i < fila.cronologica.entradas.length; i++) {
                    if (fila.cronologica.entradas[i].id_cliente == cliente) return {success: false, error: "Cliente já está na fila."};
                }

                //coloca cliente na fila
                const posicao = fila.tamanho + 1;
                const promise = await this.fila.pushToCronologica(id_fila, cliente, preferencial, premium, posicao);
                return {success: true, answer: {posicao: posicao}};
            }
            else {
                return {success: false, error: "Entrada em filas agendadas não suportada no momento."};
            }
        }
        else return {success: false, error: "Fila não está aberta."};
    }

    async sair(id_fila, cliente) {
        const fila = (await this.fila.findOne({_id: id_fila})).result;
        if (!fila) return {success: false, error: "Fila inexistente"};
            if (fila.cronologica) {
                const promise = await this.fila.pullFromCronologica(id_fila, cliente);
                return {success: true};
            }
            else return {success: false, error: "Filas agendadas não suportadas no momento."};
    }
}
