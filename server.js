const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("./connection")
const app = express()
const WebHookModel = require("./WebHook.model")

MongoClient().then(()=>{
    console.log("connected")
}).catch(console.log)

app.use(bodyParser.urlencoded({urlencoded:false}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("WELCOME TO HANDS ON DEMO OF WEBHOOK")

})

app.get("/api/webhook",(req,res)=>{
    WebHookModel.find().then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"SUCESSFULLY FETCHED"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})
app.post("/api/webhook",(req,res)=>{
    let body = req.body;

    WebHookModel.create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"SUCESSFULLY FETCHED"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.put("/api/webhook/:id",(req,res)=>{
    let body = req.body;
    WebHookModel.findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"SUCESSFULLY Updated"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.delete("/api/webhook/:id",(req,res)=>{
    WebHookModel.findByIdAndRemove(req.params.id,(err,wh)=>{
        if(err){
            res.json({
                flag:false,
                data:null,
                message:err.message
            });
        }
        else
        {
            res.json({
                flag:true,
                data:wh,
                message:"SUCESSFULLY DELETED"
            })
        }
    })
})
app.listen(3000)