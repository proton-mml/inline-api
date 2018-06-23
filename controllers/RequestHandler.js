import ControllersFactory from './ControllersFactory';

export default class RequestHandler {
	constructor(app, jwtsecret, mongo, pg) {
		this.controllersFactory = new ControllersFactory(app, jwtsecret, mongo, pg);

		this.get = this.get.bind(this);
		this.post = this.post.bind(this);
		this.put = this.put.bind(this);
		this.delete = this.delete.bind(this);
	}

	async get(req, res) {
		const { url, params, query } = req;
		const response = await this.controllersFactory.getControllers(url)(params, query);
		if (response.data && response.data.path) res.download(response.data.path);
		else res.send(response);
	}

	async post(req, res) {
		const { url, body, params, query } = req;
		const response = await this.controllersFactory.postControllers(url)(body, params, query);
		res.send(response);
	}

	async put(req, res) {
		const { url, body, params, query } = req;
		const response = await this.controllersFactory.putControllers(url)(body, params, query);
		res.send(response);
	}

	async delete(req, res) {
		const { url, body, params, query } = req;
		const response = await this.controllersFactory.deleteControllers(url)(params, query);
		res.send(response);
	}
}
