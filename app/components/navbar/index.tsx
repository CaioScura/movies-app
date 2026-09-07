"use client";

import { useState } from "react";
import "./index.scss";
import { BiCameraMovie } from "react-icons/bi";
import searchBar from "../SearchBar";
import SearchBar from "../SearchBar";


interface NavbarProps {
    activeTab: "movies" | "tv";
    setActiveTab: (tab: "movies" | "tv") => void;
    onSearch: (query: string) => void;
}

export default function Navbar({ activeTab, setActiveTab, onSearch }: NavbarProps) {

    return(
        <nav className="navbar">
            <h1 className="page-title">
                <BiCameraMovie className="icon-movie"/>
                Filmes Caiote
            </h1>

            <SearchBar onSearch={onSearch} />

            <div className="navbar-tabs">
                <button
                    className={`btn-abas ${activeTab === "movies" ? "active" : ""}`}
                    onClick={() => setActiveTab("movies")}
                >
                    Filmes
                </button>

                <button
                    className={`btn-abas ${activeTab === "tv" ? "active" : ""}`}
                    onClick={() => setActiveTab("tv")}
                >
                    Séries de TV
                </button>

                <button
                    className={`btn-abas ${activeTab === "tv" ? "active" : ""}`}
                    onClick={() => setActiveTab("tv")}
                >
                    Animes
                </button>

            </div>
        </nav>
    )   
}