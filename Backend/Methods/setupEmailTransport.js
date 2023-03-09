const { Utility } = require('../Utilities/Utility');

function setupEmailTransport(transport, supportEmail) {
  const transportOptions = transport;
  Utility.transport = transport;
  process.env.SUPPORT_EMAIL = supportEmail;
  return transportOptions;
}

export { setupEmailTransport };
