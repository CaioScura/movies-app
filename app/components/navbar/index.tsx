import "./index.scss";
import { BiCameraMovie } from "react-icons/bi";

export default function Navbar() {
    return(
        <nav className="navbar">
            <h1 className="page-title">
                <BiCameraMovie className="icon-movie"/>
                Filmes Caiote
            </h1>
        </nav>
    )   
}