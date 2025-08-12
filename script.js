const darkMode = document.querySelector('.dark-mode');
const pokemonContainer = document.querySelector('.pokemon-container');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-active');
    if (document.body.classList.contains('dark-mode-active')) {
        darkMode.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'
        darkMode.style.color = 'white';
    } else {
        darkMode.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode'
        darkMode.style.color = 'black';
    }
})


async function fetchCountries() {
    try {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
        const pokemon = await data.json()
        const pokemonData = pokemon.results;
        showPokemon(pokemonData);
    } catch (err) {
        console.error('Error fetching pokemon:', err)
    }
}
fetchCountries();


function showPokemon(pokemonData) {
    // console.log(pokemonData)
    pokemonData.forEach((data) => {
        // console.log(data)
        async function fetchPokemonDetails(name) {
            try{
                const deatails=await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const pokemonDetails = await deatails.json();
                // console.log(pokemonDetails.sprites.front_default);
                getPokemonImage(pokemonDetails, data);
            }catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }
        fetchPokemonDetails(data.name)

        function getPokemonImage(pokemonDetails,data) {
            // console.log(pokemonDetails);
            // console.log(pokemonDetails.sprites.front_default);
            // console.log(pokemonDetails.types[0].type.name ,pokemonDetails.types[1].type.name);
            // console.log(data.name)
            const pokemonCard = document.createElement('a')
            pokemonCard.classList.add('pokemon-card')
    
            const cardHTML = `
                <img class="pokemon-img" src="${pokemonDetails.sprites.front_default}" alt="${data.name}">
                <div class="details">
                    <h3 class="pokemon-name">${data.name}</h3>
                    <p class="pokemon-power">Power: ${pokemonDetails.types.length > 1? pokemonDetails.types[0].type.name + ' & ' + pokemonDetails.types[1].type.name:pokemonDetails.types[0].type.name}</p>
                </div>
            `
            pokemonCard.innerHTML = cardHTML
            pokemonContainer.append(pokemonCard)
        }
    });
}