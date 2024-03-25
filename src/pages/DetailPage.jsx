import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImageURL, options } from "../constants/constants";
import Loading from "../components/Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const DetailPage = () => {
  // getting id of the movie
  const { id } = useParams();
  // data of the movie
  const [movie, setMovies] = useState(null);
  // data of the cast
  const [cast, setCast] = useState(null);

  useEffect(() => {
    // cast info
    axios
      .get(`/movie/${id}/credits`, options)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.log(err));
    // movie basic infos
    axios
      .get(`/movie/${id}`, options)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      {!movie ? (
        <Loading />
      ) : (
        <>
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImageURL.concat(movie.backdrop_path)}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          {/**Companies */}
          <div className="col-md-6 mt-4 p-4">
            <h3>Production Companies</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_companies.map((comp) => (
                <div className="bg-white rounded p-2">
                  {comp.logo_path ? (
                    <img
                      className="object-fit-contain"
                      title={comp.name}
                      width={100}
                      height={50}
                      src={baseImageURL.concat(comp.logo_path)}
                    />
                  ) : (
                    <p
                      style={{ width: "100px", marginTop: "10px" }}
                      className="text-black text-center fw-bold"
                    >
                      {comp.name}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-4">Laguages</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.spoken_languages.map((lang) => (
                <div className="rounded p-1 bg-white text-black fw-bold">
                  <span>{lang.english_name}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-4">Countries</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_countries.map((country) => (
                <div className="rounded p-1 bg-white text-black fw-bold">
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/**Price */}
          <div className="col-md-6 mt-4 p-4">
            <p className="lead">{movie.overview}</p>
            <p>
              <span className="fw-bold">Budget of the movie: </span>$
              {movie.budget}
            </p>
            <p>
              <span className="fw-bold">Revenue of the movie: </span>$
              {movie.revenue}
            </p>
          </div>

          {/**Cast */}
          <div className="col-12 p-4 my-3">
            <h5>Cast</h5>
            <Splide
              options={{
                height: "200px",
                gap: "10px",
                pagination: false,
                autoWidth: true,
              }}
            >
              {cast?.map((castMember) => (
                <SplideSlide key={castMember.cast_id}>
                  <div className="actor-card h-100">
                    <img
                      className="movie"
                      src={baseImageURL.concat(castMember.profile_path)}
                    />
                    <p>
                      <span>{castMember.name}</span>
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
