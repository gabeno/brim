
/*
 * GET home page.
 */

var 
  check = require('validator').check,
  Customer = require('../models/customer'),
  mailConfig = require('../helpers/mail');

exports.index = function(req, res) {
  res.render('main', {
    plans: true,
    thankyou: true,
    optIn: true
  });
};

exports.save = function(req, res) {
  var 
    email = req.body.email.toLowerCase(),
    validEmail = check(email).isEmail();

  if (!validEmail._errors.length) {
    // save email to db
    // send email message onlyfor new email
    // redirect to /thankyou page
    
    Customer.findOne({ email: email }, function(err, docs) {
      // email not in database
      if (!docs) {
        var newCustomer = new Customer({ email: email });

        // save email to db
        newCustomer.save(function(err) {
          if (err) return console.log('Unable to save user email');
          // new email, send an onboarding email message
          mailConfig.mailOptions.to = email;
          mailConfig.smtpTransport.sendMail(mailConfig.mailOptions, function(err, response) {
            if (err) console.log(err);
            console.log(response);
            // update email status to confirm email sent successfully
            Customer.findOneAndUpdate({ email: email }, { emailStatus: 1 }, function(err, doc) {
              if (err) console.log(err);
            });
          });
          res.send({ newEmail: true });
        });
      }
      // email already exists in database
      else {
        res.send({ newEmail: false });
      }
    });
  }
};

exports.plans = function(req, res) {
  res.render('main', {
    index: true,
    thankyou: true,
    optIn: true
  });
};

exports.choose = function(req, res) {
  res.render('main', {
    index: true,
    thankyou: true,
    plans: true
  });
}

exports.thankyou = function(req, res) {
  if (req.query.m) {
    res.render('main', {
      index: true,
      plans: true,
      optIn: true,
      emailExists: true
    });
  }
  else {
    res.render('main', {
      index: true,
      plans: true,
      optIn: true
    });
  }
};