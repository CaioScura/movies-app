import {useState} from "react";
import "./index.scss";
import { BiSearch } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const search = query.trim(); 

        // if (!search) { 
        //     return; 
        // }

        onSearch(search);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <FiSearch className="search-icon" />

            <input 
                type="text" 
                placeholder="Pesquisar filmes e séries..." 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                />
        </form>
    );
}