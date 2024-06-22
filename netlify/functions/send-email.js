const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
  const { name, email, phone, findUs, message } = JSON.parse(event.body);

  const mg = mailgun({
    apiKey: '6fafb9bf-c3df1eb8',
    domain: 'sandbox7f8924ef21534d0da2226073e47490b0.mailgun.org'
  });

  const data = {
    from: email,
    to: 'jonathannmaynard@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nHow Did You Find Us: ${findUs}\nMessage: ${message}`
  };

  try {
    await mg.messages().send(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() })
    };
  }
};
