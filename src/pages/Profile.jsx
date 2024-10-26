import { useEffect, useState, useRef } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
import { UserAuth } from '../context/AuthContext'
import { createImageUrl } from '../services/movieServices.js'
import { db } from '../services/firebase.js'
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore"



const Profile = () => {
    const [movies, setMovies] = useState([])
    const { user } = UserAuth();
    const sliderRef = useRef(null);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
                if (doc.data()) setMovies(doc.data().favShows);
            })
        }
    }, [user?.email]);

    const slide = (offset) => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + offset;
        }
    };

    const handleUnlikeShow = async (movie) => {
        const userDoc = doc(db, "users", user.email);

        await updateDoc(userDoc, {
            favShows: arrayRemove(movie)
        })
    }
    return (
        <>
            <div>
                <div>
                    <img
                        className="block w-full h-[500px] object-cover"
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_small.jpg" alt="//" />

                    <div className="bg-black/60 fixed top-0 left-0 h-[500px]" />

                    <div className="absolute top-[20%] p-4 md:p-8">
                        <h1 className="text-3xl md:text-5xl font-sans-bold">My Shows</h1>
                        <p className="font-sans-bold text-gray-400 text-lg">{user.email}</p>
                    </div>
                </div>

                {/* movie row */}

                <h1 className="font-sans-bold md:text-xl p-4 capitalize">Fav Shows</h1>

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
                        {
                            movies.map((movie) => {
                               return  <div 
                                    key={movie.id}
                                    className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 ">
                                    <img className="w-full h-40 block object-cover object-top "
                                        src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} alt={movie.title} />

                                    <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                                        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-sans-bold">{movie.title}</p>

                                        <p>
                                            <AiOutlineClose 
                                            onClick={() => handleUnlikeShow(movie)}
                                            size={30} 
                                            className="absolute top-2 right-2" />
                                        </p>
                                    </div>


                                </div>
                            })
                        }


                    </div>
                    <MdChevronRight
                        onClick={() => slide(500)}
                        className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                        size={40}
                    />
                </div>
            </div>
        </>
    )
}

export default Profile