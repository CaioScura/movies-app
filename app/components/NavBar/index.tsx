"use client";

import "./index.scss";
import { BiCameraMovie } from "react-icons/bi";
import SearchBar from "../SearchBar";


interface NavbarProps {
    activeTab: "movies" | "tv" | "anime";
    setActiveTab: (tab: "movies" | "tv" | "anime") => void;
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
                    className={`btn-abas ${activeTab === "anime" ? "active" : ""}`}
                    onClick={() => setActiveTab("anime")}
                >
                    Animes
                </button>

            </div>
        </nav>
    )   
}