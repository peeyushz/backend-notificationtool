// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const dotenv = require("dotenv");
dotenv.config();

const accountSid = "AC968a98c6efc5dce58f1a4abefb74b295";
const authToken = "570ff15b2d48af17295c27e7ee824717";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({ body: "Hello from Twilio", from: "+12316254740", to: "+917790999344" })
  .then(message => console.log(message.sid));