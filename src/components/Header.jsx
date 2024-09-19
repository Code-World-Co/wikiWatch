import { NavLink, Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import '../style/util/Header.css'
import { useEffect,useState } from "react";
import { useSearchData } from "../hooks/useGetDataMedia";

export function Header({ handleSearchData }) {
  const onclick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="navWeb">
      <Link to="/WikiWatch/" className="logo" onClick={onclick}>
        <h1 className="title">
          <span className="firstWord-title title">WIKI</span>WATCH
        </h1>
      </Link>

      <nav className="navWeb-link">
        <NavLink to="/movies" className="link">Movies</NavLink>
        <NavLink to="/tv" className="link">Series</NavLink>
        <a className="link" href="https://github.com/Code-World-Co/WikiWatch">
          <AiFillGithub className="icon" />
        </a>
      </nav>

      <SearchForm handleSearchData={handleSearchData} />
    </header>
  );
}

export function SearchForm({ handleSearchData }) {
  const [searchForm, setSearchForm] = useState("");
  const [searchResultsForm, setSearchResultsForm] = useState([]);
  const result = useSearchData({ text: searchForm, category: "movie" });
  const handleSearch = (e) => {
    setSearchForm(e.target.value);
  };

  useEffect(() => {
    setSearchResultsForm(result);
  }, [searchForm]);

  useEffect(() => {
    handleSearchData(searchResultsForm);
  }, [searchResultsForm]);

  return (
    <div className="searchContainer">
      <input className="textField" type="text" placeholder="Search..." onChange={handleSearch} />
    </div>
  );
}