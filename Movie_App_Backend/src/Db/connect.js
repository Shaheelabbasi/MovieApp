const mongoose=require("mongoose")

const connectDb=async()=>{

    try {
       const connectionInstance=await mongoose.connect("mongodb://localhost:27017/MovieApp")
        console.log("successfully connected to the database")
    } catch (error) {
        console.log("Error connecting to the database",error)
    }
}

module.exports= {
    connectDb
}