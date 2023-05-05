"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";

type movie = {
  description: string;
  film_id: number;
  length: number;
  rating: string;
  release_year: number;
  special_features: string;
  title: string;
};

export default function Page() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    fetch(`http://localhost:3000/api/db/movies?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data]);
      });
  }, [page]);

  const handleWaypointEnter = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  return (
    <div className="flex flex-wrap gap-4 py-2 ">
      {movies.map((movie: movie) => {
        return (
          <div key={movie.title} className="w-52 bg-slate-400 rounded-lg p-3">
            <h1 className="py-12">{movie.title}</h1>
            <div className="text-sm">
              <p>Rating: {movie.rating}</p>
              <p>Release year: {movie.release_year}</p>
              <p>Length: {movie.length}</p>
              <p>Description: {movie.description}</p>
            </div>
          </div>
        );
      })}
      <Waypoint onEnter={handleWaypointEnter} />
    </div>
  );
}