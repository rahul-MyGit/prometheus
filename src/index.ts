import express from "express";
import { middleware } from "./middeware";
const app = express();

app.use(express.json());
app.use(middleware);

app.get("/user", (req,res)=>{
    let user = {
        name: "Gujjar",
        age: 22
    }
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

app.listen(3000, ()=>{
    console.log("server is running on post 3000");
    
});