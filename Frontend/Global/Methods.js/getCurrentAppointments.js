import axios from 'axios';
import { DateTime } from 'luxon';

async function getTodaysAppointments(email) {
  try {
    const response = await axios({
      method: 'POST',
      url: `/ScheduleIt/Owners/${email}/Appointments/Date`,
      data: {
        ownerEmail: email,
        selectedDate: DateTime.now().toISO(),
        userType: 'Owner',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export { getTodaysAppointments };
