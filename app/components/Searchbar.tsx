import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar() {
    const [search, setSearch] = useState<string>("");
    const [movies, setMovies] = useState<Array<any>>([]);

    return (
        <div className="flex items-center justify-center">
        <input
            className="border border-gray-300 rounded-md py-2 px-4 w-1/2"
            type="text"
            placeholder="Hae elokuvia..."
            onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-sakila-10 text-sakila-20 rounded-md py-2 px-4 ml-2">
            <FontAwesomeIcon icon={faSearch} />
        </button>
        <ul>
            {movies.map((movie) => {
            return <li key={movie.title}>{movie.title}</li>;
            })}
        </ul>
        </div>
    );
}


