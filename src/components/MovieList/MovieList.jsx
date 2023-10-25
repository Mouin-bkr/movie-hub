import { useEffect, useState } from "react";
import _, { sortBy } from "lodash";

import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = ({ type, title, emoji }) => {
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState({
        by: "default",
        order: "asc",
    });

    useEffect(() => {
        fetchMovies();
    }, [type]);

    useEffect(() => {
        if (sort.by !== "default") {
            const sortedMovies = _.orderBy(
                filterMovies,
                [sort.by],
                [sort.order]
            );
            setFilterMovies(sortedMovies);
        }
    }, [sort]);

    const fetchMovies = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${type}?api_key=183928bab7fc630ed0449e4f66ec21bd`
        );
        const data = await response.json();
        setMovies(data.results);
        setFilterMovies(data.results);
    };

    const handleFilter = (rate) => {
        if (rate === minRating) {
            setMinRating(0);
            setFilterMovies(movies);
        } else {
            setMinRating(rate);

            const filtered = movies.filter(
                (movie) => movie.vote_average >= rate
            );
            setFilterMovies(filtered);
        }
    };

    const handleSort = (e) => {
        const { name, value } = e.target;
        setSort((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className='movie_list' id={type}>
            <header className='align_center movie_list_header'>
                <h2 className='align_center movie_list_heading'>
                    {title}{" "}
                    <img
                        src={emoji}
                        alt={`${emoji} icon`}
                        className='navbar_emoji'
                    />
                </h2>

                <div className='align_center movie_list_fs'>


                    <p className="sort" style={{color:"grey"}}>Sort by :</p> <select
                        name='by'
                        id=''
                        onChange={handleSort}
                        value={sort.by}
                        className='movie_sorting' >
                        
                        <option value='release_date'>Date</option>
                        <option value='vote_average'>Rating</option>
                    </select>
                    <select
                        name='order'
                        id=''
                        onChange={handleSort}
                        value={sort.order}
                        className='movie_sorting'>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Descending</option>
                    </select>
                </div>
            </header>

            <div className='movie_cards'>
                {filterMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;
