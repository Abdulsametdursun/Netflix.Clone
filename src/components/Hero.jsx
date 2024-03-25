import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { baseImageURL } from "../constants/constants";

const Hero = () => {
  const state = useSelector((store) => store);

  // create numbers between 0 to 19
  const randomIndex = Math.round(Math.random() * 19);

  // if loading done, access a random movie
  const randomMovie = !state.isMovieLoading && state.popularMovies[randomIndex];
  return (
    <div className="hero row p-4">
      {state.isMovieLoading || !randomMovie ? (
        <Loading />
      ) : (
        <>
          <div className="col-md-6 d-flex flex-column gap-3 align-items-center justify-content-center">
            <h1>{randomMovie.title}</h1>
            <p className="text-start">{randomMovie.overview}</p>
            <p>
              IMDB:{" "}
              <span className="text-warning">
                {randomMovie.vote_average.toFixed(1)}
              </span>
            </p>
            <div className="d-flex gap-3">
              <Link className="btn btn-danger" to={"/detail"}>
                Watch Movie
              </Link>
              <Link className="btn btn-info" to={"/"}>
                Add to List
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="img-fluid rounded shadow"
              src={baseImageURL.concat(randomMovie.poster_path)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
