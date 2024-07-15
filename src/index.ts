import client from 'prom-client';
import express from "express";

// import { middleware } from "./middeware";
// import { requestCount } from "./monitoring/requestCounter";
// import { activeUserCount  } from "./monitoring/requestGauge";
import { requestHistogramCountInMS } from "./monitoring/requestHistogram";

const app = express();

app.use(express.json());

// app.use(middleware);
// app.use(requestCount);
// app.use(activeUserCount);
app.use(requestHistogramCountInMS)

app.get("/user", async (req,res)=>{
    // await new Promise((resolve) => setTimeout(resolve, 1000))  // TO verify the Gauge
    res.send({
        name: "Rahul",
        age: "21"
    });

});


app.post("/user", (req,res)=>{
    const user = req.body;
    res.send({
        ...user,
        id: 1
    });
});


//exposing for prom to pool the bucket
app.get("/metrics", async (req,res)=>{
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000, ()=>{
    console.log("server is running on post 3000");
    
});