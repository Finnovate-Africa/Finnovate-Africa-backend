import { handleCastErrorDB, handleDuplicateFieldDB, handleSyntaxError, handleValidationErrorDB } from "./customErrors";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { sendDevError, sendProdError } from "./EnvErrors";
import { NODE_ENV } from "../serviceUrl";

const GlobalErrorHandler:ErrorRequestHandler = (err:any, req:Request, res:Response, next:NextFunction)=>{
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    if (NODE_ENV=== "development"){
        
        return sendDevError(err, res)
    } else{
        let error = {...err};
        //console.log(err)
        error.message = err.message;
        if(error.name === "CastError") error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicateFieldDB(error);
        if(error.name === "ValidationError") error = handleValidationErrorDB(error);
        if(error.type === "entity.parse.failed") error = handleSyntaxError();
        sendProdError(error, res);
        return;
    }
}

export default GlobalErrorHandler