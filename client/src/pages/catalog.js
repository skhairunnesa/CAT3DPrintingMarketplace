import React, {useState, useEffect} from "react";
import { CatalogPage, Search, Tags, Results, Element, Link, Img, NumResults } from "./../components/catalogElements";
import SearchBar from './../components/SearchBar';

const Catalog = () => {
    const [query, setQuery] = useState([]);
    const [ numElements, setCount ] = useState(0);
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/catalog/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ test: "asdw" }),
        })
        .then((response) => response.json())
        .then((data) => {
            setQuery(data);
            setResults(data);
            setCount(data.length);
            console.log("IN fetch: ", query);
            setError('');
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError('An error occurred while fetching data.');
        });
        //console.log("OUT fetch", query);
    }, []);

    const handleSubmit = async (query) => {
     try {
          setResults([]);
          fetch("http://localhost:5000/catalog/1", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({query}),
          })
          .then((response) => response.json())
          .then((data) => {
              setResults(data);
              setCount(data.length);
              console.log(data);
              console.log("Q", query);
          });
      } catch (error) {
          console.error('Error fetching data:', error);
          setError('An error occurred while fetching data.');
      }
    };


const renderElements = () => {
     let content = [];
     let num = results.length;
     let link = "http://localhost:3000/product/";
     if (num === undefined) {
         content.push(
             <Element>
                 <h1><Link href={link + results.structure_id}>{results.structure_id}</Link></h1>
                 <Img src={results.images[0]} alt="Alternative Text" />
                 <p><Link href="https://www.cat.com/en_US.html">House Construction Group</Link></p>
             </Element>
         );
     } else {
         for (let i = 0; i < num; i++) {
             content.push(
                 <Element>
                     <h1><Link href={link + results[i].structure_id}>{results[i].structure_id}</Link></h1>
                     <Img src={results[i].images[0]} alt="Alternative Text" />
                     <p><Link href="https://www.cat.com/en_US.html">House Construction Group</Link></p>
                 </Element>
             );
         }
     }

     return content;
     
    }

    return (
        <CatalogPage>
            <Search>
                <SearchBar onSubmit={handleSubmit} />
                {error && <p className="error">{error}</p>}
            </Search>
            <Tags>
                <h1><Link onClick={() => {handleSubmit("residential")}}>Residential</Link></h1>
                <h1><Link onClick={() => {handleSubmit("business")}}>Business</Link></h1>
                <h1><Link onClick={() => {handleSubmit("industrial")}}>Industrial</Link></h1>
            </Tags>
            <Results>
                {renderElements()}
            </Results>
            <NumResults>
                <p>Results Displayed: {numElements}</p>
            </NumResults>
        </CatalogPage>
    );
}

export default Catalog;
