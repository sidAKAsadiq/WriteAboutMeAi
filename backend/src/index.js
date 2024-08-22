import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env' 
 })

connectDB()
.then(() => {
    //check for errors before starting app
    app.on('error' , (error) => {
        console.log("Error starting the app : ", error);  
    })
    //Starting app
    app.listen((process.env.PORT || 3000) , () => {
        console.log("App running on port" , process.env.PORT);
        
    })
})
.catch((error) => {
    console.log("In app.js , Error connecting DB : ",error);
})



