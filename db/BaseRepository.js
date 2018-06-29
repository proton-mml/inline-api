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
