import winston from "winston";
import {Request, Response, NextFunction} from "express";

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:'status.log'})
    ], 
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message})=>{
            return (`${timestamp} [${level}]: ${message}`);
        })
    )
})

const logRequest =  (req:Request, res:Response, next:NextFunction)=>{
    logger.info(`${req.method} - ${req.url}`)
    next()
}
export default logger;
export {logRequest}
