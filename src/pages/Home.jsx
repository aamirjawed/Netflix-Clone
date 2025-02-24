import Hero from '../components/Hero'
import MovieRow from '../components/movieRow'
import endpoints from '../services/movieServices'

const Home = () =>{
    return (
        <>
            <Hero />
            <MovieRow title='upcoming' url={endpoints.upcoming} />
            <MovieRow title='trending' url={endpoints.trending} />
            <MovieRow title='top rated' url={endpoints.topRated}/>
            <MovieRow title='comedy' url={endpoints.comedy} />
            <MovieRow title='popular' url={endpoints.popular} />
        </>
    )
}

export default Home