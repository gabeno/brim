
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('main', {
    title: 'Brim - Messaging and Collaboration Tool for Customer Service Teams'
  });
};