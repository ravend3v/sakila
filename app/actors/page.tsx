"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type actor = {
  first_name: string;
  last_name: string;
  actor_id: number;
};

export default function Page() {
  const [actors, setActors] = useState<Array<actor>>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const url = `http://localhost:3000/api/db/actors?page=${page}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setActors((prevActors) => [...prevActors, ...data]);
      });
  }, [page]);

  const handleWaypointEnter = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  return (
    <div className="flex flex-wrap gap-4 py-2 ">
      {actors.map((actor: actor) => {
        return (
          <Link
            href={`/movies?actor=${actor.actor_id}`}
<<<<<<< HEAD
            key={actor.first_name}
            className="w-52 bg-sakila-10 rounded-lg p-3"
=======
            key={`${actor.first_name}-${actor.actor_id}`}
            className="w-52 bg-slate-500 rounded-lg p-3"
>>>>>>> 753e6654effab2492ba9d62259a9cea61ad0d7a9
          >
            <h1>{actor.first_name + " " + actor.last_name}</h1>
          </Link>
        );
      })}
      <Waypoint onEnter={handleWaypointEnter} />
    </div>
  );
}