import React, { useState } from 'react';
import Unsplash, { toJson } from "unsplash-js";

import API_KEY from './config'

const unsplash = new Unsplash({
    accessKey: API_KEY,
  });
  

export default function SearchPhotos() {
    const [query, setQuery] = useState("");
/**SearchPhotos is an asynchronous function that's trigger when the search button is clicked 
 * unsplash.search specifies the search to photos 
 * @params query- keyword to search for
 * @params toJson - method to covert response to JSON 
  */
    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
            .photos(query)
            .then(toJson)
            .then((json) => {
            console.log(json);
            });
        
      };
      
    return(
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}   
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
        </>
    );
}