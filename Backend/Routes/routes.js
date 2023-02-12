module.exports = {
  scheduleIt: {
    app: "/ScheduleIt", // This must be part of the documentation of the package online.
    owners: {
      all: "/ScheduleIt/Owners",
      owner: "/ScheduleIt/Owners/:id",
    },
    appointments: {
      all: "/ScheduleIt/Owners/:id/Appointments",
      appointment: "/ScheduleIt/Owners/:id/Appointments/:appointmentId",
    },
    clients: {}, // The main reason that clients need are for both checking appointments that they personally can update or delete, as well as for the opportunity to request appointments.
  },
};
