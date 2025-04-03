import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../serviceUrl";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          return done(null, {
            status: "fail",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
