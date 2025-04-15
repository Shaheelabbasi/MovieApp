
const { Movies } = require("../Models/movies.model");
const { asyncHandler } = require("../Utils/asyncHandler")



const SearchMovies = asyncHandler(async (req, res) => {
    const { title, page = 1 } = req.query

    console.log("title received heer is ",title)
    //4 results per page 
    const limit = 4;
    const skip = (page - 1) * limit;
    if (!title) {
       return res.json({
            status: 400,
            msg: "title is required"
        })

    }

    //check the movie datbase for existing title movies 

    const movieCount = await Movies.countDocuments({
        title: { $regex: title, $options: "i" }
    });
    if (movieCount > 0) {
        const moviesFromDb = await Movies.find({ title: { $regex: title, $options: "i" } }).skip(skip).limit(limit)
        return res.json({
            status: 200,
            message: "Fetched movies from DB",
            data: moviesFromDb,
            total: movieCount,
            currentPage: Number(page),
            totalPages: Math.ceil(movieCount / limit),
        });
    }
    console.log("movie count is ", movieCount)
    // we make api request to the api to get the results
    const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}&page=${page}`);
    const data = await response.json()

    if (data.Response == "False") {
        return res.json({
            status: 404,
            msg: "not found"
        })
    }

    const totalResults = Number(data.totalResults)
    console.log("total results are :",totalResults)
    // let say we want to display 4 results per page
    //we use this to make sure we dont skip any results
    // round up to nearest integer
    const totalPages = Math.ceil(totalResults / limit)

    console.log("total pages are :", totalPages)
    //movies on the first page
    let allMovies = [...data.Search];


    // code if result is more than one pages 
    //for second and above pages
    for (let i = 2; i <= totalPages; i++) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}&page=${i}`);
        const data = await response.json()
        if (data.Search) {
            allMovies = allMovies.concat(data.Search)
        }
    }
    const uniqueMovies = [];
    const existingIDs = new Set();
  

    for (let movie of allMovies) {
      if (!existingIDs.has(movie.imdbID)) {
        uniqueMovies.push(movie); // Add movie to the result
        existingIDs.add(movie.imdbID); // add id to set for uniqueness
      }
    }



    for (let movie of uniqueMovies) {
        const exists = await Movies.findOne({ imdbID: movie.imdbID });
        if (!exists) {
          await Movies.create({
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          });
        }
      }


      // Paginate the api data
      const paginatedData = uniqueMovies.slice(skip, skip + limit);

    res.json({
        status: 200,
        message: "fetched movies from api ",
        data: paginatedData,
        total: allMovies.length,
        currentPage: Number(page),
        totalPages: Math.ceil(allMovies.length / limit),
    })


})





const GetMovieBYId = asyncHandler(async (req, res) => {
    const { imdbId } = req.query
    console.log("movie id is ", imdbId)
    if (!imdbId) {
        return res.json({
            status: 400,
            msg: "id is required"
        })
    }

    const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${imdbId}`);
    const data = await response.json()

    if (data.Response == "False") {
        return res.json({
            status: 404,
            msg: "not found"
        })
    }

    return res.json({
        status: 200,
        message: "fetched movie by id successfully",
        data: data
    })

})



module.exports = {
    SearchMovies,
    GetMovieBYId
}