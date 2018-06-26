import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class EncryptionUtility {
	static hash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	}

	static compare(password, hash) {
		if(!password || !hash) return;
		return bcrypt.compareSync(password, hash);
	}

	static generateToken(info, secret, options) {
		return jwt.sign(info, secret, options);
	}

	static validateToken(token, secret) {
		if(!token) return { error: "missing token" };

		const validation = {};
		try {
			validation.decoded = jwt.verify(token, secret);
		} catch(err) {
			validation.error = err.message;
		}

		return validation;
	}
}
