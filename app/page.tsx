"use client";

import React, { useState } from "react";
import Navbar from "./components/NavBar";
import MovieList from "./components/MovieList";
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/700.css'; // Bold 
import TvList from "./components/TvList";


export default function Home() {
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main>
        {activeTab === "movies" && (
          <div className="movies-container">
            <MovieList />
          </div>
        )}

        {activeTab === "tv" && (
          <div className="tv-container">
            <TvList />
          </div>
        )}
      </main>
    </>

  );
}
