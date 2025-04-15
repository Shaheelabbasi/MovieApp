import React, { useEffect, useState } from 'react'
import MovieCard from './UI/MovieCard'
import { useNavigate, } from 'react-router-dom'

const Movies = ({ IsDark, setIsDark }) => {
    const [Movies, setMovies] = useState([])
    const [movieTitle, setmovieTitle] = useState("")
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(false)
    const [totalPages, settotalPages] = useState(null)
    const [Error, setError] = useState(null)

    const navigate = useNavigate()
    const HandleSearch = async () => {
        console.log("i am called")
        if (movieTitle.trim() == "") {
            alert("Enter movie title")
            return
        }
        setloading(true)
        const response = await fetch(`http://localhost:5000/api/searchmovies?title=${movieTitle}&page=${page}`)
        if (response.status == 429) {
            alert(response.statusText)
            return
        }
        const apidata = await response.json()
        console.log("Api response is ", apidata)
        if (apidata.status == 200) {
            setMovies(apidata.data)
            settotalPages(apidata.totalPages)
            setloading(false)
            return

        }
        if (apidata.status == 404) {
            setError(apidata.msg)
            alert(apidata.msg)
        }

        console.log("the status  is ", response.status)




    }


    useEffect(() => {

        const callapi = async () => {

            try {


              console.log("use effct called ",page)
                const response = await fetch(`http://localhost:5000/api/searchmovies?title=${movieTitle}&page=${page}`)
                const apidata = await response.json()
                setMovies(apidata.data)

        
            }
            catch (error) {
              console.log("error is ",error)
            }
        }

        callapi()
    }, [page])


    return (
        <>
            {

                <div className="border-2 border-black "

                >
                    <div className='border-2 border-black h-16 flex items-center justify-center'>
                        <input type="text"
                            className='w-80 h-12 p-1 focus:outline-none border-2 border-gray-600 rounded-[30px]'
                            placeholder='Enter Movie title '
                            value={movieTitle}
                            onChange={(e) => setmovieTitle(e.target.value)}
                        />

                        <button className='w-40 h-12 bg-blue-600 rounded-[30px]'
                            onClick={HandleSearch}
                        >

                            Search
                        </button>
                        <button className='w-40 h-12 bg-blue-600 rounded-[30px] cursor-pointer'
                            onClick={() => navigate("/favorites")}

                        >

                            View favorites
                        </button>

                        <button className='w-40 h-12 bg-blue-600 rounded-[30px] cursor-pointer'
                            onClick={() => setIsDark((prev) => !prev)}

                        >

                            Toggle Mode
                        </button>




                    </div>




                    <div className='w-full h-full border-2 border-red-600 p-10 flex items-center gap-x-14 flex-wrap'>


                        {

                            loading ? <h1>Loading data please wait</h1> :
                                Movies?.map((movie) => (

                                    <MovieCard
                                        key={movie.imdbID}
                                        movie={movie}
                                    />
                                ))
                        }

                    </div>

                    <div className='flex items-center justify-center gap-x-4'>


                        <button className={`w-40 h-12 bg-blue-600 rounded-[30px] ${page == 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
                            onClick={() => page > 1 ? setpage(page - 1) : null}

                        >

                            Previous
                        </button>

                        <button className={`w-40 h-12 rounded-[30px] ${page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
                            onClick={() => page < totalPages && setpage(page + 1)}

                        >

                            Next
                        </button>

                        <h1>Current page:{page}</h1>
                        <h1>Total Pages:{totalPages}</h1>
                    </div>
                </div>
            }
        </>



    )
}

export default Movies
