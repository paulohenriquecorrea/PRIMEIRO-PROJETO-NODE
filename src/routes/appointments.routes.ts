import {Router} from 'express';
import {parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
	console.log(request.user);
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	const appointments = await appointmentsRepository.find();

	return response.json(appointments);
});

// Usando Route Params
appointmentsRouter.get('/appointment/:id', async (request, response) => {
	console.log(request.user);

	const {id} = request.params;

	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	const appointments = await appointmentsRepository.findById(id);

	return response.json(appointments);
});

// Usando Query Params
appointmentsRouter.get('/appointment/', async (request, response) => {
	console.log(request.user);

	const {id} = request.query;

	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	const appointments = await appointmentsRepository.findById(id);

	return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
	try {
		const {provider_id, date} = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentService();

		const appointment = await createAppointment.execute({
			provider_id,
			date: parsedDate,

		});

		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({error: err.message});
	}
});

// Usando Request Params
appointmentsRouter.post('/appointment/', async (request, response) => {
	console.log(request.user);

	const {body} = request;
	console.log(body.id);

	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	const appointments = await appointmentsRepository.findById(body.id);

	return response.json(appointments);
});

export default appointmentsRouter;
