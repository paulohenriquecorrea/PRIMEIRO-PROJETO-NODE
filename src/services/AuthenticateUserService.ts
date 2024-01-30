import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

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
			throw new Error('Incorrect email/password combination.');
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new Error('Incorrect email/password combination.');
		}

		delete user.password;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const token = sign({}, '6cd5a835553a58c5eb27cbcbbe31cbe8', {
			subject: user.id,
			expiresIn: '1d',
		});

		return {
			user,
			token,
		};
	}
}

export default AuthenticateUserService;
