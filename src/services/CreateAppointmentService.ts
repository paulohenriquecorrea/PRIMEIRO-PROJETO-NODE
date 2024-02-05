/* eslint-disable @typescript-eslint/naming-convention */
import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import AppError from '../errors/AppError';

import type Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

type RequestDTO = {
	provider_id: string;
	date: Date;
};

class CreateAppointmentService {
	public async execute({provider_id, date}: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

		if (findAppointmentInSameDate) {
			throw AppErrorError('This appointment is already bookded');
		}

		const appointment = appointmentsRepository.create({

			provider_id,
			date: appointmentDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
