'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const metadata = {
  title: 'Elokuvat', // Metatieto sivun otsikosta
}

async function getGenres(): Promise<Array<any>> {
  // Funktion avulla haetaan genret backendistä, ja palautetaan data
  // try-catch -lohko ympäröi fetch-kutsun virheiden varalta
  try {
    const res = await fetch("http://localhost:3000/api/db/categories");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return []; // Palautetaan tyhjä lista, jos virhe tapahtuu
  }
}

export default function DropdownMenu() {
  const [genres, setGenres] = useState<Array<any>>([]); // Tilamuuttuja genret
  const [showGenres, setShowGenres] = useState(false); // Tilamuuttuja showGenres
  const [isOpen, setIsOpen] = useState(false); // Tilamuuttuja isOpen

  useEffect(() => {
    // Effektin avulla haetaan genret backendistä ja päivitetään genres-tilamuuttuja
    // try-catch -lohko ympäröi haun virheiden varalta
    getGenres()
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function toggleDropdown() {
    // Funktio, joka vaihtaa isOpen-tilamuuttujan arvoa
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
          <FontAwesomeIcon 
          icon={faChevronLeft} 
          className={`rotate-icon ${isOpen ? "dropdown-open" : ""}`}  
        />
        </button>
      </div>
      <ul
        className={`right-2 bg-white py-2 rounded-lg shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {genres.length === 0 ? (
          // Jos genrejä ei löydy, näytetään virheilmoitus
          <li>
            <p className="text-red-500">Error loading genres.</p>
          </li>
        ) : (
          // Muuten mapataan genres-taulukko li-elementeiksi
          genres.map((genre) => {
            return (
              <li key={uuidv4()}>
                <Link
                  className="text-sm hover:bg-gray-200 block px-4 py-2"
                  href={`movies?category=${genre.name}`}
                >
                  {genre.name}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}