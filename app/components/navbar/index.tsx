"use client";

import { useState } from "react";
import "./index.scss";
import { BiCameraMovie } from "react-icons/bi";


interface NavbarProps {
    activeTab: "movies" | "tv";
    setActiveTab: (tab: "movies" | "tv") => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {

    return(
        <nav className="navbar">
            <h1 className="page-title">
                <BiCameraMovie className="icon-movie"/>
                Filmes Caiote
            </h1>

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

            </div>
        </nav>
    )   
}