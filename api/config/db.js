import mongoose from "mongoose";

const mongoDB =async () => {
   
    try {
         const connection =await mongoose.connect(process.env.MONGO_STRING)
         console.log(`MongoDB connected successful`.bgMagenta.yellow);
    } catch (error) {
        console.log("error");
    }
}

export default mongoDB;