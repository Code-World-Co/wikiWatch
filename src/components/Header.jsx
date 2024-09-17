//import icons
import { MdTheaters } from "react-icons/md";
import { CiMonitor } from "react-icons/ci";
import { NavLink, Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import '../style/util/Header.css'
import { useEffect,useState } from "react";

export function Header() {

  const onclick = () => {
    window.scrollTo(0, 0);
  }

  return (
    <header className="navWeb">

      <Link to="/WikiWatch/" className="logo" onClick={onclick}  > 
        <h1 className="title">
        <span className="firstWord-title title">WIKI</span>WATCH
        </h1>
      </Link>

      <nav className="navWeb-link">
        <NavLink to="/movies" className='link'>Movies</NavLink>
        <NavLink to="/tv" className='link'>Series</NavLink>
        <a className="link" href="https://github.com/Code-World-Co/WikiWatch">
            <AiFillGithub className="icon"/>
        </a>
      </nav>

      <SearchForm />      

    </header>
  );
}


export function SearchForm() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const apiKey = '5cec1a15e2c219c4f08d84958efb00e7';
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${textSearch}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setSearchResults(data.results);
      });
  }, [search]);

  return (
    <div className="searchContainer">
      <input className="textField" type="text" placeholder="Search..." onChange={handleSearch} />
    </div>
  );
}
