import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import MovieItem from "./MovieItem";
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'

const MovieRow = ({ title, url }) => {

    const [movies, setMovies] = useState([]);
    const sliderRef = useRef(null);  // Use ref instead of relying on id

    useEffect(() => {
        axios.get(url)
            .then((response) => setMovies(response.data.results))
            .catch(err => console.log(err))
    }, [url]);

    const slide = (offset) => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + offset;
        }
    };

    return (
        <>
            <h2 className="font-sans-bold md:text-xl p-4 capitalize">{title}</h2>

            <div className="relative flex items-center group">
                <MdChevronLeft
                    onClick={() => slide(-500)}
                    className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                    size={40}
                />
                <div
                    ref={sliderRef}  // Attach the ref to the div
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                >
                    {movies.map((movie) => (
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
                </div>
                <MdChevronRight
                    onClick={() => slide(500)}
                    className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                    size={40}
                />
            </div>
        </>
    )
}

export default MovieRow
