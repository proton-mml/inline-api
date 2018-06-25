import { BaseRepository } from "../db/index";
import { BaseRepositoryPG } from "../db/index";
import { Avaliacao, Empresa, Cliente, Estabelecimento } from '.';

export default class ControllersFactory {
	constructor(app, jwtsecret, mongo, pg) {

	}

	postControllers(url) {

		return this.notFound;
	}

	getControllers(url) {
        if(/^(\/avaliacao)$/.test(url))
            return (async (params, query) => (await Avaliacao.getByEmailEstabelecimento('fanfafa@fanfa.com')));

        if(/^(\/empresas)$/.test(url))
            return (async (params, query) => (await Empresa.getAll()));

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
