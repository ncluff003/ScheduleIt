module.exports = {
  scheduleIt: {
    app: "/ScheduleIt", // This must be part of the documentation of the package online.
    owners: {
      all: "/Owners", // /ScheduleIt/Owners
      owner: "/:email", // It will be where we find an owner by their email, as it is one of those unique identifiers. -- /ScheduleIt/Owners/:email
    },
    token: {
      base: "/Token",
    },
    appointments: {
      all: "/Appointments", // /ScheduleIt/Owners/:email/Appointments
      dateFiltered: "/Date",
      appointment: "/:appointmentId", // /ScheduleIt/Owners/:email/Appointments/:appointmentId
      acceptAppointment: `/:ownerEmail/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone`,
      declineAppointment: `/Decline/:ownerEmail/:clientFirstName/:clientLastName/:clientEmail`,
      updateAppointment: `/:appointmentId/:ownerEmail/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone`,
      declineAppointmentUpdate: `/:appointmentId/Decline/:ownerEmail/:clientFirstName/:clientLastName/:clientEmail`,
    },
    client: {
      base: "/Client",
      owner: "/:email", // This is to be used as a way to get to the Owner's appointments.  Requesting, Updating, and Deleting.
      appointments: "/Appointments", // This is for getting the appointments that the client has with the freelancer. | -- Body -- freelancer email, and the client's email.  /ScheduleIt/Owners/Client/Appointments
      appointment: "/:appointmentId", // This is for updating and deleting the appointments that the client has with the freelancer. | -- Body -- appointment id.  /ScheduleIt/Owners/Client/Appointments/appointmentId
    },
  },
};
