# Create devices using dashboard
Using an Input Widget in the dashboard, you will be able to create devices in your account.
You can get the dashboard template to use here: http://admin.tago.io/template/5f514218d4555600278023c4
Use a dummy HTTPs device with the dashboard.

Environment Variables
In order to use this analysis, you must setup the Environment Variable table.
  account_token: Your account token. Check bellow how to get this.
  connector_id: Default Connector ID for the device (optional)
  network_id: Default Network Server ID for the device (optional)
  
Steps to generate an account_token:
1 - Enter the following link: https://admin.tago.io/account/
2 - Select your Profile.
3 - Enter Tokens tab.
4 - Generate a new Token with Expires Never.
5 - Press the Copy Button and place at the Environment Variables tab of this analysis.

# How to run this analysis
You can just upload the `analysis.js` file.

or

You can run locally, you should have last node version and install all dependencies running `npm install` on your terminal in this project folder,
after that, you can run the project just calling analysis, `node analysis.js`;
