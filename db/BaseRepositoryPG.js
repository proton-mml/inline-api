export default class BaseRepositoryPG {
	constructor(model) {
		this.model = model;
	}
	async create(data) {

	}

	async getAll(query = {}, filter = { __v: 0 }, options = { lean: true }, sort = { updated_at: -1 }) {
		return await this.resolve(this.model.find(query, filter, options).sort(sort));
	}

	async findAndUpdate(query, info, options = { new: true }) {
		return await this.resolve(this.model.findOneAndUpdate(query, info, options));
	}
}
