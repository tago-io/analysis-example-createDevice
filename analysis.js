/*
 ** Analysis Example
 ** Creating devices using dashboard
 **
 ** Using an Input Widget in the dashboard, you will be able to create devices in your account.
 ** You can get the dashboard template to use here: https://admin.tago.io/template/6143555a314cef001871ec78
 ** Use a dummy HTTPs device with the dashboard.
 **
 ** How to use:
 ** To analysis works, you need to add a new policy in your account. Steps to add a new policy:
 **  1 - Click the button "Add Policy" at this url: https://admin.tago.io/am;
 **  2 - In the Target selector, with the field set as "ID", choose your Analysis in the list;
 **  3 - Click the "Click to add a new permission" element and select "Device" with the rule "Access" with the field as "Any";
 **  4 - To save your new Policy, click the save button in the bottom right corner;
 */
const { Analysis, Resources } = require("@tago-io/sdk");

async function startAnalysis(context, scope) {
  if (!scope[0]) {
    return context.log("The analysis must be triggered by a widget.");
  }

  context.log("Creating your device");

  // Get the variables sent by the widget/dashboard.
  const network_id = scope.find((x) => x.variable === "device_network");
  const connector_id = scope.find((x) => x.variable === "device_connector");
  const device_name = scope.find((x) => x.variable === "device_name");
  const device_eui = scope.find((x) => x.variable === "device_eui");

  if (!connector_id || !connector_id.value) {
    return context.log('Missing "device_connector" in the data scope.');
  } else if (!network_id || !network_id.value) {
    return context.log('Missing "device_network" in the data scope.');
  } else if (!device_eui || !device_eui.value) {
    return context.log('Missing "device_eui" in the data scope.');
  }

  const result = await Resources.devices
    .create({
      name: device_name.value,
      // Serie number is the parameter for device eui, sigfox id, etc..
      serie_number: device_eui.value,
      tags: [
        // You can add custom tags here.
        { key: "type", value: "sensor" },
        { key: "device_eui", value: device_eui.value },
      ],
      connector: connector_id.value,
      network: network_id.value,
      active: true,
      type: "immutable",
      chunk_period: "month", //consider change
      chunk_retention: 1, //consider change
    })
    .catch((error) => {
      // Send the validation to the device.
      // That way we create an error in the dashboard for feedback.
      Resources.devices.sendDeviceData(scope[0].device, {
        variable: "validation",
        value: `Error when creating the device ${error}`,
        metadata: { color: "red" },
      });
      throw error;
    });

  // To add Configuration Parameters to the device:
  Resources.devices.paramSet(result.device_id, { key: "param_key", value: "10", sent: false });

  // Send feedback to the dashboard:
  Resources.devices.sendDeviceData(scope[0].device, { variable: "validation", value: "Device succesfully created!", metadata: { type: "success" } });
  context.log(`Device succesfully created. ID: ${result.device_id}`);
}

module.exports = new Analysis(startAnalysis);
