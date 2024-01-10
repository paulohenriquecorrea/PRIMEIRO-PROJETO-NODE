import {Router} from 'express';
import {uuid} from 'uuidv4';
import {startOfHour, parseISO, isEqual} from 'date-fns';

const appointmentsRouter = Router();

type Appointment = {
	id: string;
	provider: string;
	date: Date;
};

const appointments: Appointment[] = [];

appointmentsRouter.get('/', (request, response) => response.json({message: 'Hello, World!'}));

appointmentsRouter.post('/', (request, response) => {
	const {provider, date} = request.body;

	const parsedDate = startOfHour(parseISO(date));

	const findAppointmentInSameDate = appointments.find(appointment => isEqual(parsedDate, appointment.date));

	if (findAppointmentInSameDate) {
		return response.status(400).json({message: 'This appointment is already bookded'});
	}

	const appointment = {
		id: uuid(),
		provider,
		date: parsedDate,
	};

	appointments.push(appointment);

	response.json(appointment);
});

export default appointmentsRouter;
