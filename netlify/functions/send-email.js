const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
  try {
    const { name, email, phone, findUs, message } = JSON.parse(event.body);

    const mg = mailgun({
      apiKey: '12fd78ca5b53bfb26d664af137618882-6fafb9bf-b1288b7c',
      domain: 'sandbox7f8924ef21534d0da2226073e47490b0.mailgun.org'
    });

    const data = {
      from: `no-reply@${mg.domain}`,
      to: 'Acbygreg@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nHow Did You Find Us: ${findUs}\nMessage: ${message}`
    };

    const response = await mg.messages().send(data);
    console.log('Mailgun response:', response);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, details: error })
    };
  }
};
