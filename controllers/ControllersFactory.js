import { BaseRepository } from "../db/index";
import { BaseRepositoryPG } from "../db/index";
import { Avaliacao, Empresa, ClienteCadastrado, Estabelecimento, Authorize, Filas } from '.';
import { EncryptionUtility } from '../helper';

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

		if(/^\/estabelecimento/.test(url))
			return (async (body, query) => {
				return await Estabelecimento.getByEmail(body.email_estabelecimento, body.token);
			});

		if(/^\/estabelecimento_novo/.test(url))
			return (async (body, query) => {
				return await Estabelecimento.insere(body.nome, body.email, body.email_empresa, body.endereco, body.posicao_gps, body.senha, body.cnpj, body.token);
			});

		if(/^\/validate_token/.test(url))
			return (async (body, query) => {
				return await Authorize.validate(body.token);
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

		if(/^(\/filas_ativas)/.test(url))
			return (async (body, query) => {
				return await this.filas.filasAtivasEmail(body.email);
		    });

        if(/^(\/fila)$/.test(url))
			return (async (body, query) => {
				return await this.filas.filasId(body.id);
		    });

		if(/^(\/fila\/entrar)$/.test(url))
			return (async (body, query) => {
				const validation = EncryptionUtility.validateToken(body.token, 'frangos');
				if (validation.error) return ({success:false, error: 'token invalido'});
				const cc = (await ClienteCadastrado.getByEmail(body.email));
				if (cc) return await this.filas.entrar(body.id_fila, cc.id_cliente, cc.tipo_prioridade != "-", false);
				return {success: false, error: "Usuário inexistente"};
		    });

		if(/^(\/fila\/posicao)$/.test(url))
			return (async (body, query) => {
				const validation = EncryptionUtility.validateToken(body.token, 'frangos');
				if (validation.error) return ({success:false, error: 'token invalido'});
				const cc = (await ClienteCadastrado.getByEmail(body.email));
				if (cc) return await this.filas.clientPosition(body.id_fila, cc.id_cliente);
				return {success: false, error: "Usuário inexistente"};
		    });

		if(/^(\/fila\/sair)$/.test(url))
			return (async (body, query) => {
				const validation = EncryptionUtility.validateToken(body.token, 'frangos');
				if (validation.error) return ({success:false, error: 'token invalido'});
				const cc = (await ClienteCadastrado.getByEmail(body.email));
				if (cc) return await this.filas.sair(body.id_fila, cc.id_cliente);
				return {success: false, error: "Usuário inexistente"};
		    });
			
	    if(/^(\/empresas)/.test(url))
	        return (async (body, query) => (await Empresa.getAll(body.token)));

	    if(/^(\/avalia)/.test(url))
	        return (async (body, query) => (await Avaliacao.insert(body.token,
                                                                   body.estrelas,
                                                                   body.comentario,
                                                                   body.email_estabelecimento,
                                                                   body.email_cliente)));

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
