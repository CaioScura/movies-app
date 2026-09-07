"use client";

import React, { useState } from "react";
import Navbar from "./components/NavBar";
import MovieList from "./components/MovieList";
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/700.css'; // Bold 
import TvList from "./components/TvList";
import AnimeList from "./components/AnimeList";


export default function Home() {
  const [activeTab, setActiveTab] = useState<"movies" | "tv" | "anime">("movies");
  const [searchQuery, setSearchQuery] = useState("");

  // poster em destaque usado como fundo em vidro fosco atras de todo o conteudo
  const [backdropImage, setBackdropImage] = useState<string | null>(null);

  return (
    <>
      <div className="page-backdrop">
        <div
          className={`page-backdrop__image${backdropImage ? ' is-visible' : ''}`}
          style={backdropImage ? { backgroundImage: `url(${backdropImage})` } : undefined}
        />
        <div className="page-backdrop__overlay" />
      </div>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={setSearchQuery}
      />

      <main>
        {activeTab === "movies" && (
          <div className="movies-container">
            <MovieList searchQuery={searchQuery} onBackdropChange={setBackdropImage} />
          </div>
        )}

        {activeTab === "tv" && (
          <div className="tv-container">
            <TvList searchQuery={searchQuery} onBackdropChange={setBackdropImage} />
          </div>
        )}

        {activeTab === "anime" && (
          <div className="anime-container">
            <AnimeList searchQuery={searchQuery} onBackdropChange={setBackdropImage} />
          </div>
        )}
      </main>
    </>

  );
}
