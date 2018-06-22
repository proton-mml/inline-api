import { filas } from './schemas/filas_schema';
import { Client } from 'pg';

export default class PostgreSQL {
	constructor(env, pgUrl) {
		this.env = env;
		this.pgUrl = pgUrl;
	}

	init() {
		const client = new Client();
		console.log(`PG: Connected to ${this.env} - ${this.pgUrl}`);
	}

}
