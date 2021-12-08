const URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemonCount;
let pokemonsDetails = {};

async function getRandomPokemonURLs(all) {
  let randomPokemonsURLs = [];
  for (let i = 0; i < 3; i++) {
    let randomPokemon = all[Math.floor(Math.random() * all.length)];
    randomPokemonsURLs.push(axios.get(randomPokemon.url));
  }
  return randomPokemonsURLs;
}

async function getSpeciesURLs(pokemons) {
  let selectSpeciesURLs = [];
  pokemons.forEach((p) => {
    selectSpeciesURLs.push(axios.get(p.data.species.url));
  });
  return selectSpeciesURLs;
}

async function getSpeciesDetail(species) {
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
}

async function getPokemons() {
  const res1 = await axios.get(URL);
  allPokemonCount = res1.data.count;
  const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${allPokemonCount}`);
  const allPokemons = res2.data.results;
  const randomPokemons = await getRandomPokemonURLs(allPokemons);
  const pokemons = await Promise.all(randomPokemons);
  const speciesURLs = await getSpeciesURLs(pokemons);
  const speciesData = await Promise.all(speciesURLs);
  const details = await getSpeciesDetail(speciesData);
  console.log(details);
}
