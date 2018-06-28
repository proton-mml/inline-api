import { BaseRepository } from "../db/index";
import { BaseRepositoryPG } from "../db/index";
import { Avaliacao, Empresa, ClienteCadastrado, Estabelecimento, Authorize, Filas } from '.';

export default class ControllersFactory {
	constructor(app, jwtsecret, mongo, pg) {
		const fila = new BaseRepository(mongo.Filas);
		this.filas = new Filas(jwtsecret, fila);
	}

	postControllers(url) {
		if(/^\/estabelecimentos/.test(url))
			return (async (body, query) => {
				return await Estabelecimento.getByEmpresa(body.email_empresa, body.token);
			});

		if(/^(\/avaliacoes)/.test(url))
			return (async (body, query) => {
				return await Avaliacao.getByEmailEstabelecimento(body.email, body.token);
			});

		if(/^(\/autorizar)/.test(url))
			return (async (body, query) => {
				return await Authorize.login(body.email, body.senha);
			});

		if(/^(\/cadastrar)/.test(url))
			return (async (body, query) => {
				return await ClienteCadastrado.insert(body.nome, body.email, body.celular, body.prioridade, body.senha);
			});

    if(/^(\/empresas)/.test(url))
      return (async (body, query) => (await Empresa.getAll()));

		return this.notFound;
	}

	getControllers(url) {
		if(/^(\/filas)/.test(url))
			return (async (body, query) => {
				return await this.filas.todasFilas(body, query);
		});
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
