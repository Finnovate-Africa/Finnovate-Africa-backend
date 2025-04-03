// import {Request, Response, NextFunction} from "express";
// import { ZodSchema } from "zod";
// import AppError from "../errors/AppError";
// const validate = (schema:ZodSchema<any>)=>(req:Request, res:Response, next:NextFunction)=>{
//     try {
//         schema.parse(req.body)
//         next()
//     } catch (err:any) {
//         const zodError = JSON.parse(err)
//         const errorMessages:string = zodError.map((error:Error)=>`${error.message}`).join(", ")
//         return next(new AppError(errorMessages, 400))
//     }
// }
// export default validate

import { Request, Response, NextFunction } from "express";
import { ZodSchema , z } from "zod";
import AppError from "../errors/AppError";

const validate =
  (schema: ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if request content type is JSON or form data

      if (req.is("json")) {
        await schema.parseAsync(req.body);
      } else if (req.is("multipart/form-data") == "multipart/form-data") {
        const formData: any = {};
        // Extract all fields from req.body (excluding files handled by multer)
        for (const key in req.body) {
          if (Object.prototype.hasOwnProperty.call(req.body, key)) {
            if (key !== "file") {
              formData[key] = req.body[key];
            }
          }
        }
        // Validate the extracted form data against the schema
        await schema.parseAsync(formData);
      } else {
        return next(new AppError("Unsupported content type", 400));
        //throw new AppError('Unsupported content type', 400);
      }

      next();
    } catch (error: any) {
      
      if (error.errors) {
        const errorMessages = error.errors
          .map((e: any) => e.message)
          .join(", ");
        return next(new AppError(errorMessages, 400));
      } else {
        return next(new AppError(error.message, 400));
      }
    }
  };


export const createAdminSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["admin", "superadmin"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either 'admin' or 'superadmin'",
    }),
});

export const rateStoreSchema = z.object({
    params: z.object({
        sellerId: z.string({
            required_error: "Seller ID is required",
            invalid_type_error: "Seller ID must be a string"
        }).min(1, "Seller ID cannot be empty")
    }),
    body: z.object({
        rating: z.number({
            required_error: "Rating is required",
            invalid_type_error: "Rating must be a number"
        })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must not exceed 5")
    })
});

// This is what the validation looks like after parsing
export type RateStoreInput = z.infer<typeof rateStoreSchema>;




export default validate;
