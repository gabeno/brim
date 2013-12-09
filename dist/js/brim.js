// brim.js

// set up requirejs

requirejs.config({
  paths: {
    // external libraries
    'jquery' : 'lib/jquery-1.10.2.min',
    'jquery-migrate': 'lib/jquery-migrate-1.2.1.min',
    // own modules
    'validator': 'util/validator'
  },

  shim: {
    'jquery-migrate': ['jquery'],
    'boostrap': ['jquery']
  }
});

// main logic

requirejs(['jquery', 'validator'], function(jQuery, validator) {
  // console.log(jQuery);
  // console.log(validator);

  // landing page form processing

  // disable form fields
  // verify email

  (function($) {
    var
      $form = $('#form-email'),
      $button = $form.find('button'),
      $input = $form.find('input'),
      $inputParent = $input.parent(),
      $errorBlock = $form.find('.error-block');

    $button.on('click', function() {
      var val = $input.val();

      // clear error class and text field
      $input.parent().removeClass('has-error');
      $errorBlock.html('');

      if (!val) {
        $inputParent.addClass('has-error');
        $errorBlock.html('Email field blank.');
      }

      else if (!validator.isEmail(val)) {
        $inputParent.addClass('has-error');
        $errorBlock.html(validator.message);
      }

      else {
        $input.prop('disabled', true);
        $button.attr('disabled', true);

        // $.post(url, params, callback, type)
        $.post(
          '/save',
          {email: val},
          function(data) {
            if (data.newEmail) {
              window.location.href = '/thankyou';
            }
            else {
              window.location.href = '/thankyou?m=1';
            }
          }
        );
      }
      return false;
    });
  })(jQuery);

});