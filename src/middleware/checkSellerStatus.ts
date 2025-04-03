//This middleware is to check if the store has been blacklisted, deactivated, or even approved;

import { Request, Response, NextFunction } from "express";

import { ISeller, IUser } from "../interfaces/IUser";
import AppError from "../errors/AppError";
import { Seller } from "../models/user.model";

// interface ISeller {
//     isBlacklisted: boolean;
//     isDeactivated: boolean;
//     isApproved: boolean;
// }

const checkSellerStatus = async (req: Request, res: Response, next: NextFunction) => {
  // const user = req.user;
  const {id}= (req.user as IUser);
 
  const user = await Seller.findById(id).select("-password"); 

  if (!user)
    return next(new AppError("This account does not exist.", 403));

  if (!user.store)
    return next(new AppError("This seller does not have a store set up.", 403));
  if (!user.store.isStoreApproved) {
    return next(new AppError("Your store has not been approved yet.", 403));
  }

  if (user.store.isStoreBlacklisted) {
    return next(new AppError("This store has been blacklisted.", 403));
  } 

  if (user.store.isStoreDeactivated) {
    return next(new AppError("This has been deactivated.", 403));
  }
  if (user.store.isStoreSuspended) {
    return next(new AppError("This has been deactivated.", 403));
  }

 // req.user = store;
  next();
};


export default checkSellerStatus;
