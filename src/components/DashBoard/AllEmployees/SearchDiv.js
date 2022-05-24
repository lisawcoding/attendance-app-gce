import React from 'react'
import { BiSearchAlt } from "react-icons/bi";

function SearchDiv({changeSearchInput, searchTerm}) {
  return (
    <section className="top-div">
        <div className="search-input">
            <input type="text" onChange={changeSearchInput} value={searchTerm} placeholder="name..." />
            <BiSearchAlt />
        </div>
    </section>    
  )
}

export default SearchDiv