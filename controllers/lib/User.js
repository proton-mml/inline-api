import statusCode from "../../server/status_code";
import { ResponseFactory, EncryptionUtility } from "../../helper";

export default class User {
	constructor(pg, jwtsecret) {
    this.pg = pg;
    this.jwtsecret = jwtsecret;
		this.getInfo = this.getInfo.bind(this);
	}

	async getInfo(params, query){
		
	}

}
