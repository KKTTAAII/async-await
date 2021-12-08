const URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemonCount;
let pokemonsDetails = {};

async function getRandomPokemonURLs(all) {
  try {
    let randomPokemonsURLs = [];
    for (let i = 0; i < 3; i++) {
      let randomPokemon = all[Math.floor(Math.random() * all.length)];
      randomPokemonsURLs.push(axios.get(randomPokemon.url));
    }
    return randomPokemonsURLs;
  } catch (e){
    console.log("error", e)
  } 
}

async function getSpeciesURLs(pokemons) {
  try{
    let selectSpeciesURLs = [];
    pokemons.forEach((p) => {
      selectSpeciesURLs.push(axios.get(p.data.species.url));
    });
    return selectSpeciesURLs;
  } catch (e) {
    console.log("error", e)
  }
}

async function getSpeciesDetail(species) {
  try {
    species.forEach((specie) => {
      let name;
      let text;
      const textLength = specie.data.flavor_text_entries.length;
      for (let i = 0; i < textLength; i++) {
        if (specie.data.flavor_text_entries[i].language.name === "en") {
          name = specie.data.name;
          text = specie.data.flavor_text_entries[i].flavor_text;
          pokemonsDetails[name] = text;
        }
      }
    });
    return pokemonsDetails;
  } catch (e) {
    console.log("error", e)
  }
  
}

async function getPokemons() {
  try{
    const res1 = await axios.get(URL);
    allPokemonCount = res1.data.count;
    const res2 = await axios.get(`${URL}?limit=${allPokemonCount}`);
    const allPokemons = res2.data.results;
    const randomPokemons = await getRandomPokemonURLs(allPokemons);
    const pokemons = await Promise.all(randomPokemons);
    const speciesURLs = await getSpeciesURLs(pokemons);
    const speciesData = await Promise.all(speciesURLs);
    const details = await getSpeciesDetail(speciesData);
    console.log(details);
  } catch(e) {
    console.log("error", e);
  }
}

getPokemons();