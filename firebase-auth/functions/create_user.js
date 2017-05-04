const admin = require('firebase-admin');

module.exports = (request, response) => {
  const body = JSON.parse(request.body);
  //  Verify the user provided a phone number
  if (!body.phoneNumber) {
    return response.status(422).send({ error: 'Bad Input' });
  }

  //  Format the phone number to remove '-' & '()'
  const phoneNumber = String(body.phoneNumber).replace(/[^\d]/g, '');

  //  Create a new user with said phone number
  admin.auth().createUser({ uid: phoneNumber })
    .then(user => response.send(user))
    .catch(error => response.status(422).send({ error }));

  //  Confirm account was made with the user
  //(709) 701-0730
};
