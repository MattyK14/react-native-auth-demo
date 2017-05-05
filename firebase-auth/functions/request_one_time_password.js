const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (request, response) => {
  const body = JSON.parse(request.body);
  if (!body.phoneNumber) {
    return response.status(422).send({ error: 'You must provide a phone number' });
  }

  //  Make sure input is a string and remove any non-number characters
  const phoneNumber = String(body.phoneNumber).replace(/[^\d]/g, '');

  admin.auth().getUser(phoneNumber)
    .then(userRecord => {
      const code = Math.floor(((Math.random() * 8999) + 1000));

      twilio.messages.create({
        body: `Your code is ${code}`,
        to: phoneNumber,
        from: '+17097010730'
      }, (error) => {
        if (error) {
          return response.status(422).send(error);
        }

        admin.database().ref(`users/${phoneNumber}`)
          .update({ code, codeValid: true }, () => {
            response.send({ success: true });
          });
      });
    })
    .catch((error) => {
      response.status(422).send({ error });
    });
};
