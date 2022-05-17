import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/User";
import { Password } from "../utils/password";

passport.use(
  new Strategy({ usernameField: "login" }, async (login, password, cb) => {
    console.log(login);
    console.log(password);
    const user = await User.findOne({ where: { login: login } });

    if (!user) {
      return cb(null, false, { message: "Incorrect login or password" });
    }

    const passwordsMatch = await Password.compare(user.password, password);

    if (!passwordsMatch) {
      return cb(null, false, { message: "Incorrect username or password" });
    }

    return cb(null, user);
  })
);

// Save the session to the cookie
passport.serializeUser((user: any, done) => {
  done(null, user.user_id);
});

// Read the session from the cookie
passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { user_id: id } });
  done(null, user);
});
