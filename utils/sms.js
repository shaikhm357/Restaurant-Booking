const dotenv = require("dotenv");

//configure env file
dotenv.config({ path: "config/config.env" });

const accId = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accId, authToken);

const sms = async (body, mobile) => {
  let options = {
    from: process.env.FRON_PHONE_NO,
    to: mobile,
    body
  };
  try {
    const message = await client.messages.create(options);
    console.log(message);
  } catch (err) {
    console.error(err);
  }
};

// sms("hello second sms", "+917208168601");

module.exports = sms;
