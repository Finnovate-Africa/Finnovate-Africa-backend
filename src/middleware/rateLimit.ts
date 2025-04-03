import rateLimit from "express-rate-limit";

const Limiter = rateLimit({
    windowMs: 60 * 1000, //means 60 seconds
    limit: 100, //means 4 requests
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        next();
        // don't need below code for now
        // console.log(`Rate limit exceeded for IP: ${req.ip}`);
        // res.status(options.statusCode).send(options.message);
       
    },
});

export default Limiter;

