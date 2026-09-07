"use client";

import React, { useState } from "react";
import Navbar from "./components/NavBar";
import MovieList from "./components/MovieList";
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/700.css'; // Bold 
import TvList from "./components/TvList";


export default function Home() {
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={setSearchQuery}
      />

      <main>
        {activeTab === "movies" && (
          <div className="movies-container">
            <MovieList searchQuery={searchQuery}/>
          </div>
        )}

        {activeTab === "tv" && (
          <div className="tv-container">
            <TvList searchQuery={searchQuery}/>
          </div>
        )}
      </main>
    </>

  );
}
