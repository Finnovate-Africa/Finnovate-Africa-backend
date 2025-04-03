//This middleware will verify the accessToken on every request made to the server

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import {
  AccessToken_Secret_Key,
  Tracking_Token_Secret_Key,
} from "../serviceUrl";
import { User } from "../models/user.model";

// interface CustomRequest extends Request {
//   user?: any;
// }

// const VerifyAccessToken = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   let token: string | undefined;

//   if (!req.headers.authorization) {
//     return next(new AppError("No authorization header provided", 401));
//   }
//   token = req.headers.authorization.split(" ")[1];

//   if (!token) return next(new AppError("No access token provided", 401));

//   jwt.verify(
//     token,
//     AccessToken_Secret_Key as string,
//     async (err: any, decoded: any) => {
//       if (err)
//         return next(
//           new AppError("Incorrect or expired access token, please log in.", 401)
//         );
//       const user = await User.findById(decoded.payload.id).select("-password");
//       if (!user)
//         return next(
//           new AppError("User does not exist or account has been deleted.", 404)
//         );
//       req.user = decoded.payload;
//       next();
//     }
//   );

//   console.log('Auth Header:', req.headers.authorization);

// };
// export default VerifyAccessToken;

interface CustomRequest extends Request {
  user?: any;
}

const VerifyAccessToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (!req.headers.authorization) {
      return next(new AppError("No authorization header provided", 401));
    }

    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(new AppError("No access token provided", 401));
    }

    // Convert callback-style to Promise-style for better error handling
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        token as string,
        AccessToken_Secret_Key as string,
        (err: any, decoded: any) => {
          if (err) reject(err);
          resolve(decoded);
        }
      );
    });

    const user = await User.findById((decoded as any).payload.id).select("-password");

    if (!user) {
      return next(
        new AppError("User does not exist or account has been deleted.", 404)
      );
    }

    // update last seen
    user.lastSeen = new Date();
    await user.save();

    // Attach the full user object to the request instead of just the payload
    req.user = user;

    // console.log('Auth Header:', req.headers.authorization);
    // console.log('User attached to request:', req.user);  // Debug log

    next();
  } catch (error) {
    return next(new AppError("Incorrect or expired access token, please log in.", 401));
  }
};

export default VerifyAccessToken;

export const VerifyTrackingToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(new AppError("No authorization header provided", 401));
  }
  const token: string = req.headers.authorization.split(" ")[1];
  if (!token) return next(new AppError("No tracking token provided", 401));

  jwt.verify(
    token,
    Tracking_Token_Secret_Key as string,
    async (err: unknown, decoded: any) => {
      if (err){
        console.log(err)
        return next(
          new AppError(
            "Incorrect or expired tracking token, please log in.",
            401
          )
        );
      }
      const user = await User.findById(decoded.payload.id).select("-password");
      if (!user)
        return next(
          new AppError("User does not exist or account has been deleted.", 404)
        );
      req.user = decoded.payload;
      next();
    }
  );
};
