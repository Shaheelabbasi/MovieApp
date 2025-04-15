import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const MovieDetail = () => {
    const { imdbID } = useParams()

    const [Movie, setMovie] = useState({})
    useEffect(() => {
      const fetchById=async()=>{
        const response = await fetch(`http://localhost:5000/api/getdetails?imdbId=${imdbID}`)
        const apidata = await response.json()
    console.log("api detail is by id ",apidata)
        setMovie(apidata.data)
      }
      fetchById()
    
    }, [])
    
  return (
    <>
    
    

        <div
        key={Movie.imdbID} // 
        className="border-2 border-black p-4 flex items-center"
      >
        <img
          src={Movie.Poster}
          alt=""
          className="w-80 h-80 object-center"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{Movie.Title}</h2>
          <p className="text-sm text-gray-600">Released: {Movie.Year}</p>
          <p className="text-sm text-gray-600">Genre: {Movie.Genre}</p>
        { <p className="text-sm text-gray-600">Director: {Movie.Director}</p> }
        <p className="text-sm text-gray-600">Plot: {Movie.Plot}</p> 

       {
        Movie.Ratings && Movie.Ratings.length > 0 && (
            <div className="mt-2">
              <h3 className="text-md font-semibold text-gray-800">Ratings:</h3>
              <ul>
                {Movie.Ratings.map((rating, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {rating.Source}: {rating.Value}
                  </li>
                ))}

              </ul>
            </div>
        )
       }
       
        </div>
      </div>
    

           

</>
  )
}

export default MovieDetail
