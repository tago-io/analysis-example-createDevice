/*
 ** Analysis Example
 ** Creating devices using dashboard
 **
 ** Using an Input Widget in the dashboard, you will be able to create devices in your account.
 ** You can get the dashboard template to use here: http://admin.tago.io/template/5f514218d4555600278023c4
 ** Use a dummy HTTPs device with the dashboard.
 **
 ** Environment Variables
 ** In order to use this analysis, you must setup the Environment Variable table.
 **   account_token: Your account token. Check bellow how to get this.
 **   connector_id: Default Connector ID for the device (optional)
 **   network_id: Default Network Server ID for the device (optional)
 **
 ** Steps to generate an account_token:
 ** 1 - Enter the following link: https://admin.tago.io/account/
 ** 2 - Select your Profile.
 ** 3 - Enter Tokens tab.
 ** 4 - Generate a new Token with Expires Never.
 ** 5 - Press the Copy Button and place at the Environment Variables tab of this analysis.
 */
const { Analysis, Account, Utils, Device } = require('@tago-io/sdk');

async function init(context, scope) {
  if (!scope[0]) return context.log('This analysis must be triggered by a widget.');

  context.log('Creating your device');
  // Get the environment variables.
  const env = Utils.envToJson(context.environment);
  if (!env.account_token) return context.log('Missing "account_token" environment variable');
  else if (env.account_token.length !== 36) return context.log('Invalid "account_token" in the environment variable');

  // Instance the Account class
  const account = new Account({ token: env.account_token });

  // Get the device used for the dashboard.
  const dashboard_dev_token = await Utils.getTokenByName(account, scope[0].origin);
  const dashboard_device = new Device({ token: dashboard_dev_token });

  // Get the variables form_payload and form_port sent by the widget/dashboard.
  const connector_id = scope.find(x => x.variable === 'connector_id') || { value: env.payload, origin: env.connector_id };
  const network_id = scope.find(x => x.variable === 'network_id') || { value: env.payload, origin: env.network_id };
  const device_name = scope.find(x => x.variable === 'device_name');
  const device_serial = scope.find(x => x.variable === 'device_serial');

  if (!connector_id || !connector_id.value) return context.log('Missing "connector_id" in the data scope.');
  else if (!network_id || !network_id.value) return context.log('Missing "network_id" in the data scope.');

  const result = await account.devices.create({
    name: device_name.value || 'Any name',
    serie_number: device_serial.value,
    tags: [
      // You can add custom tags here.
      { key: 'tag_key', value: 'tag_value' },
    ],
    connector: connector_id.value,
    network: network_id.value,
    active: true,
  }).catch((error) => {
    dashboard_device.sendData({ variable: 'validation', value: `Error when creating the device ${error}`, metadata: { color: 'red' } });
    throw error;
  });

  // To add Configuration Parameters to the device:
  account.devices.paramSet(result.device_id, { key: 'param_key', value: '10', sent: false });

  // To add any data to the device that was just created:
  const device = new Device({ token: result.token });
  device.sendData({ variable: 'temperature', value: 17 });

  // Send feedback to the dashboard:
  dashboard_device.sendData({ variable: 'validation', value: 'Device succesfully created!', metadata: { color: 'green' } });
  context.log(`Device succesfully created. ID: ${result.device_id}`);
}

module.exports = new Analysis(init);
