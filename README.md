# Create devices using dashboard
Using an Input Widget in the dashboard, you will be able to create devices in your account.

You can get the dashboard template to use here: https://admin.tago.io/template/6143555a314cef001871ec78

Use a dummy HTTPs device with the dashboard.

## How to use this analysis internally at TagoIO servers

In order to use this analysis, you must to add a new policy in your account.<br>

Steps to add a new policy:

   1 - Click the button "Add Policy" at this url: https://admin.tago.io/am;

   2 - In the Target selector, with the field set as "ID", choose your Analysis in the list;

   3 - Click the "Click to add a new permission" element and select "Device" with the rule "Access" with the field as "Any";

   4 - To save your new Policy, click the save button in the bottom right corner;<br>

# How to run this analysis
You can just upload the `analysis.js` file.

or

You can run locally, you should have last node version and install all dependencies running `npm install` on your terminal in this project folder,
after that, you can run the project just calling analysis, `node analysis.js`;
