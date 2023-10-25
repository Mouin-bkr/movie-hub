import { Routes, Route } from "react-router-dom";
import "./App.css";
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import SingleMovie from "./components/MovieList/SingleMovie";

const App = () => {
    return (
        <div className='app'>
            <Navbar />

            <main>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <MovieList
                                type='popular'
                                title='Popular'
                                emoji={Fire}
                            />
                        }
                    />
                    <Route
                        path='/top_rated'
                        element={
                            <MovieList
                                type='top_rated'
                                title='Top Rated'
                                emoji={Star}
                            />
                        }
                    />
                    <Route
                        path='/upcoming'
                        element={
                            <MovieList
                                type='upcoming'
                                title='Upcoming'
                                emoji={Party}
                            />
                        }
                    />
                    <Route path='/movie/:movieId' element={<SingleMovie />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
