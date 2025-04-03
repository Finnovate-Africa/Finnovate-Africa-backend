import {  Response } from "express";

export const sendDevError = (err:any, res:Response) =>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
};

export const sendProdError =(err:any, res:Response)=>{
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
        })
    } else {
        res.status(500).json({
            status:"error",
            message:"Something went very wrong.",
        })
    }
}
