import mongoose from "mongoose"
import { app } from "./app";

const start = async () => {
  console.log(`Starting Up auth.......`);
  if(!process.env.JWT_KEY)
  {
    throw new Error('JWT_KEY must be defined')
  }

  if(!process.env.MONGO_URI){
    throw new Error("Mongo URI must be definned")
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb')
  } catch (err) {
    console.log(err)    
  }

  app.listen(3000,()=>{
    console.log(`Auth listening on port 3000`)
  })
  
}

start()