export function SearchForm ({handleChange}){
    return( 
      <section className="searchForm">
      <form className="form">
        <input className="textField" type="text" placeholder="Search..." onChange={handleChange} />
        <CiSearch className="icon" />
      </form>
    </section>    
    )
  }