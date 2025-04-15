const mongoose=require("mongoose")

const movieSchema=mongoose.Schema({

   imdbID:{
     type:String,
     unique:true

   },
    title:{
        type:String, 
        unique:true
    },
    year:{
     type:String,
    },
    poster:{
        type:String,
    }


})

const Movies=mongoose.model("movies",movieSchema)

module.exports={
    Movies
}