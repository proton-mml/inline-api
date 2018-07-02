import { EncryptionUtility } from '../../helper';
import mongoose from 'mongoose';

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
        const fila = (await this.fila.findOne({_id: mongoose.Types.ObjectId(id_fila)})).result;
        if (!fila) return {success: false, error: "Fila inexistente"};
        if (fila.cronologica) {
            for (let i = 0; i < fila.cronologica.entradas.length; i++) {
                if (fila.cronologica.entradas[i].id_cliente == cliente)
                    return {success: true, answer: {posicao: fila.cronologica.entradas[i].posicao}};
            }
            for (let i = 0; i < fila.cronologica.concluidos.length; i++) {
                if (fila.cronologica.concluidos[i].id_cliente == cliente
                    && fila.cronologica.concluidos[i].desistencia_ou_atendido == "chamado para atendimento") {
                        return {success: true, answer: {posicao: -1}};
                        const inser = (await this.fila.findAndUpdate(
                            {_id: mongoose.Types.ObjectId(id_fila), "cronologica.concluidos.id_cliente": cliente},
                            {"cronologica.concluidos.$.desistencia_ou_atendido": "atendido"}
                        ));
                }
            }
            return {success: true, answer: {posicao: undefined}}
        } else return {success: false, error: "Fila agendada não suportada ainda."};
    }

    async proximo(id_fila) {
        let prox = (await this.fila.findOne({_id: mongoose.Types.ObjectId(id_fila), "cronologica.entradas": {$elemMatch: {"posicao": 1}}}));
        console.log(prox);
        if (prox && prox.result != null) {
            prox = prox.result.cronologica.entradas[0];
            console.log(prox);
            (await this.fila.pullFromCronologica(prox.id_cliente));
            const concluido = {
                id_cliente: prox.id_cliente,
                distancia: prox.distancia,
                data_hora_entrada: prox.data_hora_entrada,
                preferencial: prox.preferencial,
                premium: prox.premium,
                posicao: prox.posicao,
                data_hora_saida: (new Date()),
                desistencia_ou_atendido: "chamado para atendimento",
            };
            (await this.fila.findAndUpdate ({_id: mongoose.Types.ObjectId(id_fila)}, {$push: {"cronologica.concluidos": concluido}}));
            return {success: true, answer: {id_cliente: prox.id_cliente}};
        }
        else return {success: false, error: "Erro: Fila inexistente, não é cronologica ou está vazia."};
    }

    async entrar(id_fila, cliente, preferencial, premium) {
        const fila = (await this.fila.findOne({_id: mongoose.Types.ObjectId(id_fila)})).result;
        if (!fila) return {success: false, error: "Fila inexistente"};
        if ((new Date(fila.data_hora_inicio)) < (new Date()) && (new Date (fila.data_hora_fim)) > (new Date())) {
            if (fila.cronologica) {
                for (let i = 0; i < fila.cronologica.entradas.length; i++) {
                    if (fila.cronologica.entradas[i].id_cliente == cliente) return {success: false, error: "Cliente já está na fila."};
                }

                //coloca cliente na fila
                const posicao = fila.tamanho + 1;
                const promise = await this.fila.pushToCronologica(mongoose.Types.ObjectId(id_fila), cliente, preferencial, premium, posicao);
                return {success: true, answer: {posicao: posicao}};
            }
            else {
                return {success: false, error: "Entrada em filas agendadas não suportada no momento."};
                // for (agendamento in fila.agendada.agendamentos)
                //     if ((new Date(agendamento.data_hora_agendada) == hora)
                //         return {success:false, error: "Já existe outro agendamento este horário."};
                // // inserir cliente aqui
            }
        }
        else return {success: false, error: "Fila não está aberta."};
    }

    async sair(id_fila, cliente) {
        const fila = (await this.fila.findOne({_id: mongoose.Types.ObjectId(id_fila)})).result;
        if (!fila) return {success: false, error: "Fila inexistente"};
            if (fila.cronologica) {
                const promise = await this.fila.pullFromCronologica(mongoose.Types.ObjectId(id_fila), cliente);
                return {success: true};
            }
            else return {success: false, error: "Filas agendadas não suportadas no momento."};
    }
}
