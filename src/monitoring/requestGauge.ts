import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const activeUserGauge = new client.Gauge({
    name: "avtive_user",
    help: "Total number of users whoes request hasn't yet resilved",
    labelNames: ["method", "route"]
});

export function activeUserCount( req: Request, res: Response ,next : NextFunction){
    const startTime = Date.now();
    activeUserGauge.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
    });

    res.on('finish', ()=>{
        const endTime = Date.now();
        console.log(`Request takes ${endTime - startTime}ms`);
        

        activeUserGauge.dec({
            method: req.method,
            route: req.route ? req.route.path : req.path,
        });

    });

    next();
}