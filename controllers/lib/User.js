import statusCode from "../../server/status_code";
import { ResponseFactory, EncryptionUtility } from "../../helper";

export default class User {
	constructor(pg, jwtsecret) {
    this.pg = pg;
    this.jwtsecret = jwtsecret;
		this.getInfo = this.getInfo.bind(this);
	}

	async getInfo(params, query){
		const promise = await this.solstar.getOne();
		if (promise.error) return ResponseFactory.create(MONGO_ACCESS_ERROR);
		if (!promise.result) return ResponseFactory.create(INFO_NOT_FOUND);

		return ResponseFactory.create(OK, null, promise.result);
	}

}
