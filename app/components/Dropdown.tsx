'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"
import  { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


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

  const [showGenres, setShowGenres] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div className="flex">
        <button className="mr-2 px-4 text-sakila-20 hover:bg-gray-200">
          <Link href="/movies">{metadata.title}</Link>
        </button>
        <button
          className="text-sakila-20 hover:bg-gray-200 py-2 flex items-center"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <ul className={`right-2 bg-white py-2 rounded-lg shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
        
        {genres.map((genre) => {
          return (
            <li key={uuidv4()}>
              <Link className="text-sm hover:bg-gray-200 block px-4 py-2" href={`/movies/genre/${genre.name}`}>
                {genre.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}