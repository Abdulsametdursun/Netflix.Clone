import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseImageURL, options } from "../constants/constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

// Will send requests for movies under categories and list the movies.
const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
        options
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [genre.id]);

  return (
    <div className="p-4">
      <h1 className="mb-3">{genre.name}</h1>
      <Splide
        options={{
          gap: "10px",
          pagination: false,
          autoWidth: true,
        }}
      >
        {movies?.map((movie) => (
          <SplideSlide key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
              <img
                className="movie"
                src={baseImageURL.concat(movie.poster_path)}
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
