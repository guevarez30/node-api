// import passport from "passport";
// import * as passport_jwt from "passport-jwt";
// import notifier from "../utils/notifer.js";
// const ExtractJwt = passport_jwt.ExtractJwt;
// const JwtStrategy = passport_jwt.Strategy;

// async function setUser(DB, email) {
//     const [user] = await DB.Users.findMany({
//         where: {
//             email: email,
//             active: true,
//         },
//         include: {
//             organizations_users: {
//                 include: {
//                     organizations: true,
//                 },
//             },
//         },
//     });
//     return user;
// }

// export default function passportAuth(DB) {
//     const opts = {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: process.env.API_SECRET,
//     };

//     passport.use(
//         new JwtStrategy(opts, function (jwt_payload, done) {
//             const email = jwt_payload.email;
//             if (!email) return done(null, false);
//             setUser(DB, email)
//                 .then((user) => {
//                     if (!user) return done(null, false);
//                     return done(null, user);
//                 })
//                 .catch((err) => {
//                     notifier.error(err);
//                     return done(err, false);
//                 });
//         })
//     );

//     return passport.authenticate("jwt", { session: false });
// }
//

const auth = (DB) => (req, res, next) => {
  console.log('doing auth check');
  next();
};

module.exports = auth;
