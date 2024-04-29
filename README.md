# Device Creation via Dashboard
Leverage an Input Widget on the dashboard to facilitate the creation of devices within your account.

Access the required dashboard template here: [Dashboard Template](https://admin.tago.io/template/6143555a314cef001871ec78).

It's recommended to use a [Database](https://admin.tago.io/connectors/62336c32ab6e0d0012e06c04/62333bd36977fc001a2990c8) connector for the device alongside the dashboard.

## Implementing This Analysis on TagoIO Servers

To utilize this analysis within TagoIO, you'll need to incorporate a new policy to your account.

### Steps to Incorporate a New Policy:

1. Navigate to [Add Policy](https://admin.tago.io/am) and click on the "Add Policy" button.
2. In the Target selection area, ensure the field is set to "ID", then select your Analysis from the dropdown list.
3. Click on the "Click to add a new permission" option, choose "Device" as the type, and set the rule to "Access" with the scope as "Any".
4. Finalize by clicking the save button located at the bottom right corner to store your new policy.

# Executing the Analysis

To deploy the analysis, you have two options:

- Directly upload the `analysis.js` file.
- For local execution, ensure you have the latest version of Node.js installed. Install all necessary dependencies by running `npm install` in your project directory via the terminal. Subsequently, initiate the analysis using `node analysis.js`.
