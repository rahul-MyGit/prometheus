import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const requestHistogram = new client.Histogram({
    name: "HTTP_Request_Duration_IN_MS",
    help: "Duration of HTTP request in ms",
    labelNames: ["method", "route", "code"],
    buckets: [0.1 , 5, 10, 15, 20, 30, 40, 50]
});

export function requestHistogramCountInMS( req: Request, res: Response ,next : NextFunction){
    //Can add code to inc requestCount and inc/dec requestActiveUserCount
    const startTime = Date.now();
    res.on('finish', ()=>{
        const endTime = Date.now();
        console.log(`Request takes ${endTime - startTime}ms`);
        

        requestHistogram.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime - startTime);
    });

    next();
}