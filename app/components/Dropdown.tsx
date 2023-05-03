'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"

const metadata = {
  title: 'Elokuvat',
}

async function getGenres(): Promise<Array<any>> {
  let res = await fetch("http://localhost:3000/api/db/categories");
  let data = await res.json();
  console.log(data);
  return data;
}

export default function DropdownMenu() {
  let [genres, setGenres] = useState<Array<any>>([]);
  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
    });
  }, []);


  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <button className="text-gray-700 hover:bg-gray-200 block px-4 py-2" onClick={toggleDropdown}>
        {metadata.title}
      </button>
      <ul className={`right-2 bg-white py-2 rounded-lg shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
        {genres.map((genre) => {
          return (
            <li key={genre.id}>
              <Link className="text-sm hover:bg-gray-200 block px-4 py-2" href={`/genre/${genre.name}`}>
                {genre.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}