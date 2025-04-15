const express=require("express")

const MovieRouter=express.Router()
const {SearchMovies,GetMovieBYId}=require("../Controller/movies.controller.js")
MovieRouter.get("/searchmovies",SearchMovies)
MovieRouter.get("/getdetails",GetMovieBYId)


module.exports={MovieRouter}
