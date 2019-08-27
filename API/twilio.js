const accountSid = "AC4424661674dfe2bf1d3db506ea2547f4";
const authToken = "d177fedf74fa6765fe7f8ae1fd561ad2";
const client = require("twilio")(accountSid, authToken);

const sendText = function(body, from) {
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+15017122661",
      to: "+15558675310"
    })
    .then(message => console.log(message.sid));
};

module.exports = sendText;
