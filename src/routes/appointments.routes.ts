import {Router} from 'express';
import {startOfHour, parseISO, isEqual} from 'date-fns';
import Appointment from '../model/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.get('/', (request, response) => response.json({message: 'Hello, World!'}));

appointmentsRouter.post('/', (request, response) => {
	const {provider, date} = request.body;

	const parsedDate = startOfHour(parseISO(date));

	const findAppointmentInSameDate = appointments.find(appointment => isEqual(parsedDate, appointment.date));

	if (findAppointmentInSameDate) {
		return response.status(400).json({message: 'This appointment is already bookded'});
	}

	const appointment = new Appointment(provider, parsedDate);

	appointments.push(appointment);

	response.json(appointment);
});

export default appointmentsRouter;
