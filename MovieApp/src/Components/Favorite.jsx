import React, { useEffect, useState } from 'react'
const favorite = ({}) => {

    const [Movies, setMovies] = useState([])

    useEffect(() => {
      
    const movies=JSON.parse(localStorage.getItem("favorites"))
     if(movies !=null)
     {
        setMovies(movies)
     }
     
    }, [])
    
  return (
    <>

 


 

    <div className='p-10 flex items-center gap-x-14 flex-wrap border-2 border-black'>
{
Movies.map((movie)=>(
         <div className="bg-white  rounded-lg overflow-hidden w-64 cursor-pointer border-2 border-black"
       >
      <img
        src={movie.poster}
        alt={""}
        className="w-full h-80 object-center"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
        <p className="text-sm text-gray-600">Released :{movie.year}</p>
      </div>
    </div>
))}
    </div>
    
    </>
  )
}

export default favorite
