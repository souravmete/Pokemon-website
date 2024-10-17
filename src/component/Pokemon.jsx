import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';

export const Pokemon = () => {

    const [pokemondata,setPokemondata] = useState([])
    const [loading,setLoading] =useState(true)
    const [error,setError] =useState(null)
    const [searchpokemon,setSearchpokemon]=useState('')


    const API ='https://pokeapi.co/api/v2/pokemon?offset=0&limit=100'


    const fetchPokemon= async()=>{
        try {
            const res = await fetch(API);
            const data = await res.json();

            // console.log(data)

            const detailedPokemonData = data.results.map(async (curr)=>{
               const res = await fetch(curr.url)
               const data = await res.json()
               return data;
            //    console.log(data)
            })
            // console.log(detailedPokemonData)
            const detailedResponse = await Promise.all(detailedPokemonData)

            setPokemondata(detailedResponse)
            setLoading(false)
            console.log(detailedResponse)

        } catch (error) {
            console.log(error)
        }
        


    }

    useEffect(()=>{
        fetchPokemon();
    },[])


    // search functionality 
    const searchData =pokemondata.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(searchpokemon.toLowerCase()))

      if(loading){
        return <>
          <h1>Loading</h1>
        </>
      }

      if(error){
        return <>
            <h1>{error.message}</h1>
        </>
      }

    return (
        <>
          <section className="container">
            <header>
              <h1> Lets Catch Pokémon</h1>
            </header>
            <div className="pokemon-search">
              <input
                type="text"
                placeholder="search Pokemon"
                value={searchpokemon}
                onChange={(e)=>setSearchpokemon(e.target.value)}
              />
            </div>
            <div>
              <ul className="cards">
              {
                searchData.map((curr)=>{
                return  <PokemonCard key={curr.id} pokemonData={curr}/>
                })
              }
              </ul>
            </div>
          </section>
        </>
      );
}
