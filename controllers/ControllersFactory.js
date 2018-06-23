import { BaseRepository } from "../db/index";
import { BaseRepositoryPG } from "../db/index";

export default class ControllersFactory {
	constructor(app, jwtsecret, mongo, pg) {
		const users = new BaseRepositoryPG(pg.users);
		this.users = new User(users, pg, jwtsecret);
	}

	postControllers(url) {
		if(/^(\/user\/new)$/.test(url)) return this.users.newUser;
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
