require('dotenv').load();

const express = require('express');
const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  var email = new sendgrid.Email();
  
  email.addTo(process.env.EMAIL_TARGET);
  email.setFrom(`${req.body.name} <${req.body.email}>`);
  email.setSubject('Hackathon ICT Inquiry');
  email.setHtml(`
    From: ${req.body.name} <${req.body.email}>
    <br><br>
    ${req.body.message}
  `);

  console.log('Sending email!', req.body);

  sendgrid.send(email, (err, data) => {
    if (err) return res.status(500).json({ sent: false });
    console.log('Mail sent!');
    return res.json({ sent: true });
  });
});

app.listen(3927, () => {
  console.log('Listening on 3927');
});
