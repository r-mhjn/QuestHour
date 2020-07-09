var passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../../database/models/admin.model');
// const bcrypt = require('bcrypt');

function adminLogin(username, password, done) {
	Admin.findOne({ username: username, password: password })
		.then(admin => {
			if (admin != null) {
				done(null, admin);
			} else {
				done(null, false);
			}
		})
		.catch(err => {
			done(err, false);
		});
}

function cookieExtractor(req) {
	console.log('called extractor');
	var token = null;
	if (req && req.cookies) {
		token = req.cookies['jwt'];
	}
	return token;
}

function authRequest(req, payload, done) {
	Admin.findById(payload._id)
		.then(admin => {
			if (payload.ip != req.ip) {
				return done(null, false);
			}
			return done(null, admin);
		})
		.catch(err => done(err));
}

function authRequestWithCookie(req, payload, done) {
	console.log('req', req.body);
	console.log('payload', payload);
	return done(null, payload.admin);
}

passport.use('admin-login', new LocalStrategy(adminLogin));
// passport.use(new passportJWT.Strategy({
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('token'),
// 	secretOrKey: process.env.JWT_SECRET,
// 	passReqToCallback: true
// }, authRequest));
passport.use(new passportJWT.Strategy({
	jwtFromRequest: cookieExtractor,
	secretOrKey: process.env.JWT_SECRET,
	passReqToCallback: true
}, authRequestWithCookie));

module.exports = passport;