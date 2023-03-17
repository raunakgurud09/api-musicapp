import express, { Request, Response } from "express"
const app = express()


app.use('/',(req:Request,res:Response)=>{
    res.send("working")
})

app.listen(5003,()=>{
    console.log('server is listening on port 5000...')
})