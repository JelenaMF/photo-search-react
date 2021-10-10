import React, { useState } from 'react';
import Unsplash, { toJson } from "unsplash-js";

import API_KEY from './config'

const unsplash = new Unsplash({
    accessKey: API_KEY,
  });
  

export default function SearchPhotos() {
    //using an empty string to intitialize the state of the searchbar input as a string 
    const [query, setQuery] = useState("");
    //the responses will be stored in the empty array
    const [pics, setPics] = useState([]);

/**SearchPhotos is an asynchronous function that's trigger when the search button is clicked 
 * unsplash.search specifies the search to photos 
 * @params query- keyword to search for
 * @params toJson - method to covert response to JSON 
  */
    const searchPhotos =  (e) => {
        e.preventDefault();
        unsplash.search
            .photos(query)
            .then(toJson)
            .then((json) => {
                setPics(json.results); //updates the state every time a new search query is made. 
                setQuery(""); //sets the input field back to empty 
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
                <button type="submit" className="button" >
                    Search
                </button>
            </form>
            <div className="card-list">
                {/**map through the state and display image id */}
                {
                pics.map((pic) => <div className="card" key={pic.id}>
                    <img className="card-image"
                    alt={pic.alt_description}
                    src={pic.urls.full}
                    width="50%"
                    height="50%"></img>
                </div>
                )
                }
            </div>
        </>
    );
}