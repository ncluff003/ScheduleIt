import axios from 'axios';
import { DateTime } from 'luxon';
import { appointment } from '../../Components/Appointment';

async function getTodaysAppointments(info) {
  try {
    const response = await axios({
      method: 'POST',
      url: `/ScheduleIt/Owners/${info.email}/Appointments/Date`,
      data: {
        ownerEmail: info.email,
        selectedDate: DateTime.now().toISO(),
        userType: 'Owner',
      },
    });

    const currentAppointments = response.data.data.currentAppointments;
    const results = response.data.data;
    info.currentAppointments = currentAppointments;

    return { results, currentAppointments };
  } catch (error) {
    console.error(error);
  }
}

export { getTodaysAppointments };
