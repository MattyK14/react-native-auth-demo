const admin = require('firebase-admin');

module.exports = (request, response) => {
  const body = JSON.parse(request.body);

  if (!body.phoneNumber || !body.code) {
    return response.status(422).send({ error: 'Code must be provided' });
  }

  const phoneNumber = String(body.phoneNumber).replace(/[^\d]/g, '');
  const code = parseInt(body.code, 10);

  admin.auth().getUser(phoneNumber)
    .then(() => {
      const ref = admin.database().ref(`users/${phoneNumber}`);
      
      ref.on('value', snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return response.status(422).send({ error: 'Code not valid.' });
        }

        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phoneNumber)  // phoneNumber is user id
          .then(token => response.send({ token }));
      });
    })
    .catch((error) => response.status(422).send({ error }));
};
