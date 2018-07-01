import mongoose from 'mongoose';
export default class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	async create(info) {
		const entity = new this.model(info);
		return await this.resolve(entity.save());
	}

	async getAll(query = {}, filter = { __v: 0 }, options = { lean: true }, sort = { updated_at: -1 }) {
		return await this.resolve(this.model.find(query, filter, options).sort(sort));
	}

	async findOne(query = {}, filter = { __v: 0 }, options = { lean: true }) {
		return await this.resolve(this.model.findOne(query, filter, options));
	}

	async findAndUpdate(query, info, options = { new: true }) {
		return await this.resolve(this.model.findOneAndUpdate(query, info, options));
	}

	async pushToCronologica(fila, cliente, preferencial, premium, posicao, distancia = "0") {
		const promise = this.model.update (
			{_id: fila},
			{$push: {"cronologica.entradas": {
				"id_cliente": cliente,
				"distancia": distancia,
				"data_hora_entrada": Date(),
				"preferencial": preferencial,
				"premium": premium,
				"posicao": posicao
			}}, $inc: {"tamanho": 1}},
		);
		return await this.resolve(promise);
	}

	async pullFromCronologica(fila, cliente) {
        var entrada = (await this.resolve(this.model.aggregate([
            {$match: {_id: mongoose.Types.ObjectId(fila)}},
            {$unwind: '$cronologica.entradas'},
            {$match: {'cronologica.entradas.id_cliente': cliente}}
        ]))).result[0].cronologica.entradas;

        entrada.desistencia_ou_atendido = "atendido";
        entrada.data_hora_saida = new Date();

        

		// const promise = this.model.update (
		// 	{_id: fila},
		// 	{$pull: {"cronologica.entradas": {"id_cliente": cliente}}, $inc: {"tamanho": -1}},
		// );
        return;
		return await this.resolve(promise);
	}

	async delete(query) {
		return await this.resolve(this.model.remove(query));
	}

	async resolve(promise) {
		let result;
		let error;
		try {
			result = await promise;
		} catch(e) {
			error = e;
		}

		return { error, result };
	}
}
