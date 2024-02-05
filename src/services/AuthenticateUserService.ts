
import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import User from '../models/User';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface Request {
	email: string;
	password: string;
}

/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface Response {
	user: User;
	token: string;
}

class AuthenticateUserService {
	public async execute({email, password}: Request): Promise<Response> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({
			where: {email},
		});

		if (!user) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		delete user.password;

		const {secret, expiresIn} = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		return {
			user,
			token,
		};
	}
}

export default AuthenticateUserService;
