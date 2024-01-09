import {Router} from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({message: 'Hello, World!'}));

routes.post('/users', (request, response) => {
	const {nome, email} = request.body;

	const user = {
		nome,
		email,
	};

	response.json(user);
});

export default routes;

