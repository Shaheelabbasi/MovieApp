import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({movie}) => {
    const navigate = useNavigate()
    const addtoFavourites=(movie)=>{
     // check if the movie already existing
     console.log("getting faviorites ",localStorage.getItem("favorites"))
     const existingmovie=JSON.parse(localStorage.getItem("favorites")) || []
     console.log("existing movies are :",existingmovie)
     const Isfav=existingmovie.some((fav) => fav.imdbID == movie.imdbID);
     if(!Isfav)
     {
       existingmovie.push(movie)
       localStorage.setItem("favorites",JSON.stringify(existingmovie))
       alert("Added to favorites")
     }
     else
     {
        alert("Already in favorites")
     }

    }
  return (
       <div className="bg-white  rounded-lg overflow-hidden w-64 border-2 border-black"
       >
      <img
        src={movie.poster}
        alt={""}
        className="w-full h-80 object-center"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
        <p className="text-sm text-gray-600">Released :{movie.year}</p>
        <h1 onClick={() => navigate(`/moviedetails/${movie.imdbID}`)} className='cursor-pointer mb-4 text-blue-600'>view details</h1>
        <button className='w-35 h-12 bg-blue-600 rounded-[30px] cursor-pointer'
        onClick={()=>addtoFavourites(movie)}
        
        >

         Add to favourites
        </button>
      </div>
    </div>

  )
}

export default MovieCard
