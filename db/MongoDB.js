import mongoose from 'mongoose';
import { filas } from './schemas/filas_schema';

export default class MongoDB {
	constructor(env, mongoUrl) {
		this.env = env;
		this.mongoUrl = mongoUrl;
	}

	init() {
		const Schema = mongoose.Schema;
		mongoose.connect(this.mongoUrl);
		console.log(`MONGO: Connected to ${this.env} - ${this.mongoUrl}`);
		this.Filas = mongoose.model('filas', filas(Schema));
	}

}
