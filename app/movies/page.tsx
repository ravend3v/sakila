"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type movie = {
  description: string;
  film_id: number;
  length: number;
  rating: string;
  release_year: number;
  special_features: string;
  title: string;
  actor_names: string;
  category: string;
};

export default function Page() {
  const [movies, setMovies] = useState<Array<movie>>([]);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const actor = searchParams.get("actor");
    const url = `http://localhost:3000/api/db/movies?page=0${
      category ? `&category=${category}` : ""
    }${actor ? `&actor=${actor}` : ""}`;

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
        });
    } catch (e: any) {
      console.error(e.message);
    }
  }, [searchParams]);

  async function loadMore() {
    const category = searchParams.get("category");
    const actor = searchParams.get("actor");
    const url = `http://localhost:3000/api/db/movies?page=${page}${
      category ? `&category=${category}` : ""
    }${actor ? `&actor=${actor}` : ""}`;

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMovies([...movies, ...data]);
        });
      setPage(page + 1);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      {movies.map((movie: movie) => {
        return (
          <div key={movie.title} className="w-52 bg-slate-500 rounded-lg p-3">
            <h1>{movie.title}</h1>
            <div className="text-sm">
              <p>Rating: {movie.rating}</p>
              <p>Release year: {movie.release_year}</p>
              <p>Length: {movie.length}</p>
              <p>Description: {movie.description}</p>
              <p>Category: {movie.category}</p>
              <p>Actors:  
                {movie.actor_names}
              </p>
            </div>
          </div>
        );
      })}
      <Waypoint
        onEnter={() => {
          loadMore();
        }}
      />
    </div>
  );
}