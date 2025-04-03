import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import AppError from "../errors/AppError";

const storeValidate =
    (schema: AnyZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                return next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errors = error.errors.map((e) => e.message).join(", ");
                    return next(new AppError(errors, 400));
                }
                return next(error);
            }
        };

export default storeValidate;