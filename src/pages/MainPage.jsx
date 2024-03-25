import { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPopular } from "../redux/actions/movieActions";
import { actionTypes } from "../redux/actionTypes";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);

  useEffect(() => {
    // Action that activates the loading state for movies
    dispatch({ type: actionTypes.SET_MOVIES_LOADING });

    // Get popular movies and transfer them to the store
    dispatch(getPopular());

    //get genres
    dispatch({ type: actionTypes.SET_GENRES_LOADING });
    dispatch(getGenres());
  }, []);

  return (
    <div>
      {/**Entrance */}
      <Hero />

      {/** Print a separate list for each category*/}
      {state.isGenresLoading ? (
        <Loading />
      ) : state.isGenresError ? (
        <p>There is an Error</p>
      ) : (
        state.genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default MainPage;
