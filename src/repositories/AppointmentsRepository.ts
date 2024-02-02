/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	// eslint-disable-next-line @typescript-eslint/ban-types
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({
			where: {
				date,
			},
		});

		return findAppointment || null;
	  }

	  public async findById(id: string): Promise<Appointment | undefined> {
		const findAppointment = await this.findOne({
			where: {
				id,
			},
		});

		return findAppointment;
	  }
}

export default AppointmentsRepository;
