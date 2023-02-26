import axios from 'axios';
import { DateTime } from 'luxon';

async function getTodaysAppointments(details, schedule) {
  try {
    const response = await axios({
      method: 'POST',
      url: `/ScheduleIt/Owners/${details.email}/Appointments/Date`,
      data: {
        ownerEmail: details.email,
        selectedDate: DateTime.now().toISO(),
        userType: 'Owner',
      },
    });

    const currentAppointments = response.data.data.currentAppointments;
    schedule.currentAppointments = currentAppointments;

    return { currentAppointments };
  } catch (error) {
    console.error(error);
  }
}

export { getTodaysAppointments };
