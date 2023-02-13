module.exports = {
  scheduleIt: {
    app: "/ScheduleIt", // This must be part of the documentation of the package online.
    owners: {
      all: "/Owners", // /ScheduleIt/Owners
      owner: "/:email", // It will be where we find an owner by their email, as it is one of those unique identifiers. -- /ScheduleIt/Owners/:email
    },
    appointments: {
      all: "/Appointments", // /ScheduleIt/Owners/:email/Appointments
      dateFiltered: "/Date",
      appointment: "/:appointmentId", // /ScheduleIt/Owners/:email/Appointments/:appointmentId
    },
    client: {
      base: "/Client",
      appointments: "/Appointments", // This is for getting the appointments that the client has with the freelancer. | -- Body -- freelancer email, and the client's email.  /ScheduleIt/Owners/Client/Appointments
      appointment: "/:appointmentId", // This is for updating and deleting the appointments that the client has with the freelancer. | -- Body -- appointment id.  /ScheduleIt/Owners/Client/Appointments/appointmentId
    },
  },
};
