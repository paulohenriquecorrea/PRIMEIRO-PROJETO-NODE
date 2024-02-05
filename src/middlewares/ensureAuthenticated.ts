import {type Request, type Response, type NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

type TokenPayLoad = {
	iat: number;
	exp: number;
	sub: string;
};
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
	// Validação do token JWT

	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing', 401);
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
		throw new AppError('Invalid JWT token', 401); // Para poder disparar o erro no formato que desejo
	}
}
