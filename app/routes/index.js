'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(clickHandler.renderMain);

	app.route('/login')
		.get(function (req, res) {
			res.redirect("/auth/twitter");
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn,clickHandler.renderProfile);
		
	app.route('/profile/:name')
		.get(clickHandler.renderProfile);

	app.route('/api/')
		.get(isLoggedIn,clickHandler.vote)
		.post(isLoggedIn,clickHandler.addImg)
		.delete(isLoggedIn,clickHandler.deleteImg);
	app.get('/auth/twitter',
		passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', 
		passport.authenticate('twitter', { failureRedirect: '/login' }),function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


};
