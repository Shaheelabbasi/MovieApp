import { useState } from 'react'
import Movies from './Components/Movies'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetail from './Components/MovieDetail';
import Favorite from './Components/Favorite';

function App() {
  const [IsDark, setIsDark] = useState(false)
  return (
    <>
    <div className={`min-h-screen ${IsDark ?'bg-black text-white':'bg-white text-black '}`
    }
    >
      <Routes>
        

       
        {/* Home Route */}
        <Route path="/" element={<Movies IsDark={IsDark} setIsDark={setIsDark} />} />

         <Route path="/moviedetails/:imdbID" element={<MovieDetail />} />
         <Route path="/favorites" element={<Favorite />} />
         
  
      </Routes>
      </div>
    </>
  )
}

export default App
