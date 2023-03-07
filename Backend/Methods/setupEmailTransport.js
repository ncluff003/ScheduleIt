const { Utility } = require('../Utilities/Utility');

function setupEmailTransport(transport, supportEmail) {
  const transportOptions = transport;
  Utility.transport = transport;
  // process.env.EMAIL_OPTIONS = transport;
  process.env.SUPPORT_EMAIL = supportEmail;
  console.log(transport);
  return transportOptions;
}

export { setupEmailTransport };
