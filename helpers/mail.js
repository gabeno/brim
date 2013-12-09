// sendmail.js

var nodemailer = require('nodemailer');

exports.smtpTransport = nodemailer.createTransport("SMTP", {
  service: 'Gmail',
  auth: {
    user: 'trybrim@gmail.com',
    pass: 'briM*13_trY'
  }
});

var html = [
  '<h2>Thanks for your interest in Brim</h2>',
  '<p>We have added you to our Brim waiting list. We will be sure to send you an invite soon.</p>',
  '<p>In the meantime, follow us on <a href="https://twitter.com/BrimApp">twitter</a> for updates. ',
  'We are very excited to get you using Brim as your helpdesk tool.</p>',
  '<p>Kind Regards,</p>',
  '<p><em>Gabriel M</em>, Brim Team</p>'
];

exports.mailOptions = {
  from: 'Brim Team <trybrim@gmail.com>',
  to: '',
  replyTo: 'trybrim@gmail.com',
  bcc: 'gmajivu@gmail.com',
  html: html.join(''),
  generateTextFromHTML: true,
  subject: 'Thank you Note'
};