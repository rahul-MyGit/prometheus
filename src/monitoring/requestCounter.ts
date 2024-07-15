import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const requestCounter = new client.Counter({
    name: "request_count",
    help: "Total request count",
    labelNames: ["method", "route", "status_code"]
});

export function requestCount( req: Request, res: Response ,next : NextFunction){
    const startTime = Date.now();

    res.on('finish', ()=>{
        const endTime = Date.now();
        console.log(`Request takes ${endTime - startTime}ms`);
        

        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

    });

    next();
}