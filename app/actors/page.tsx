"use client";
import { Waypoint } from "react-waypoint";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type actor = {
  first_name: string;
  last_name: string;
  actor_id: number;
};

export default function Page() {
  const [actors, setActors] = useState<actor[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    fetch(`http://localhost:3000/api/db/actors?page=${page}`)
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
            key={actor.first_name}
            className="w-52 bg-sakila-10 rounded-lg p-3"
          >
            <h1>{actor.first_name + " " + actor.last_name}</h1>
          </Link>
        );
      })}
      <Waypoint onEnter={handleWaypointEnter} />
    </div>
  );
}