/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/prefer-readonly */
import Appointment from '../model/Appointment';

import {isEqual} from 'date-fns';

interface CreateAppointmentDTO {

	provider: string;
	date: Date;
}

class AppointmentsRepository {
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public all(): Appointment[] {
		return this.appointments;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public findByDate(date: Date): Appointment | null {
		const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

		return findAppointment || null;
	  }

	// { provider, date } - Isso se chama desestruturação. Agora passa-se a usar parâmetros nomeados

	public create({provider, date}: CreateAppointmentDTO): Appointment {
		const appointment = new Appointment({provider, date});
		this.appointments.push(appointment);

		return appointment;
	}
}

export default AppointmentsRepository;
