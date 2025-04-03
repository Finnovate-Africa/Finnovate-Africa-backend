import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import { IUser } from '../interfaces/IUser';
import { IRider } from '../models/rider.model';




function CheckRole(allowedRoles: string | string[]) {
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser | IRider; // User could be from User or Rider model

        if (user) {
            // Check if user has a valid role in either User or Rider
            if (
                ("role" in user && rolesArray.includes(user.role)) ||  // User model role check
                ("isApproved" in user && user.isApproved && rolesArray.includes("rider")) // Rider role check
            ) {
                return next();
            }
        }

        return next(new AppError("You are not authorized to perform this action.", 403));
    };
}


export default CheckRole;
