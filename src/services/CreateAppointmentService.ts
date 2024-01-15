import {startOfHour} from 'date-fns';
// eslint-disable-next-line import/extensions, @typescript-eslint/consistent-type-imports
import Appointment from '../model/Appointment';
import type AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

type RequestDTO = {
	provider: string;
	date: Date;
};

class CreateAppointmentService {
	// eslint-disable-next-line @typescript-eslint/parameter-properties, @typescript-eslint/prefer-readonly
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({provider, date}: RequestDTO): Appointment {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is already bookded');
		}

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
