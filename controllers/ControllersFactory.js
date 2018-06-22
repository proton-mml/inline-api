import { BaseRepository } from "../db/index";

export default class ControllersFactory {
	constructor(app, jwtsecret, mongo) {

	}

	postControllers(url) {
		return this.notFound;
	}

	getControllers(url) {
		return this.notFound;
	}

	putControllers(url) {
		return this.notFound;
	}

	deleteControllers(url) {
		return this.notFound;
	}

	notFound() {
		return 404;
	}
}
