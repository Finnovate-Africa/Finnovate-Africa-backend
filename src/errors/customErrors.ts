import AppError from "./AppError";

//All Custom errors will be handled here, including mongodb errors, jwt error etc
export const handleCastErrorDB = (err:any)=>{
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}
export const handleDuplicateFieldDB = (err:any)=>{
    const value = err.keyValue[Object.keys(err.keyValue)[0]]
    const message = `Duplicate  field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}
export const handleValidationErrorDB = (err:any)=>{
    const errors = Object.values(err.errors).map((el:any)=> el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
}

export const handleSyntaxError = ()=> {
    const message = "You have a syntax error, please check your request format.";
    return new AppError(message, 400);
}