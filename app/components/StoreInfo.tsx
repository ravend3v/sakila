'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

async function getStores(): Promise<Array<any>> {
  // Funktion avulla haetaan genret backendistä, ja palautetaan data
  // try-catch -lohko ympäröi fetch-kutsun virheiden varalta
  try {
    const res = await fetch("http://localhost:3000/api/db/store");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return []; // Palautetaan tyhjä lista, jos virhe tapahtuu
  }
}

export default function StoreInfo() {
  const [stores, setStores] = useState<Array<any>>([]); 

  useEffect(() => {
    async function fetchStores() {
      const data = await getStores();
      setStores(data);
    }
    fetchStores();
  }, []);

  return (
    <div>
      {stores.map((store) => (
        <div key={store.store_id}>
          <div className="text-white">
            <h2 className="text-center py-2">Store {store.store_id}: {store.address}</h2>
            <p className="text-center"> City: {store.city}</p>
          </div>
          
        </div>
      ))}
    </div>
  );
}