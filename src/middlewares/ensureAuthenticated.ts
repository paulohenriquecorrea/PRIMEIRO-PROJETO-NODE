import {type Request, type Response, type NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

import authConfig from '../config/auth';

type TokenPayLoad = {
	iat: number;
	exp: number;
	sub: string;
};
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
	// Validação do token JWT

	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error('JWT token is missing');
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);
		const {sub} = decoded as TokenPayLoad;

		request.user = {
			id: sub,
		};

		console.log(decoded);
		next();
	} catch (error) {
		throw new Error('Invalid JWT token'); // Para poder disparar o erro no formato que desejo
	}
}
