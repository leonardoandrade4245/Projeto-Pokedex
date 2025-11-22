// Lista de Pokémons iniciais
const pokemonsIniciais = [
    {id:1,nome:"Bulbasauro"},
    {id:4,nome:"Charmander"},
    {id:7,nome:"Squirtle"},
    {id:152,nome:"Chikorita"},
    {id:8, nome: "Wartortle"},
    {id:2, nome: "Ivysaur"},
    {id:3, nome: "Venusaur"},
    {id:5, nome: "Charmeleon"},
    {id:6, nome: "Charizard"},
    {id:9, nome: "Blastoise"},
    {id:10, nome: "Caterpie"},
    {id:715, nome: "Noivern"},
    {id:12, nome: "Butterfree"},
    {id:25, nome: "Pikachu"},
    {id:26, nome: "Raichu"},
    {id:149, nome: "Dragonite"},
    {id:55, nome: "Golduck"},
    {id:448, nome: "Lucario"},
    {id:418, nome: "Buizel"},
    {id:706, nome: "Goodra"},
];

const lista = document.getElementById("lista");
const info = document.getElementById("pokemon-info");
const textoInicial = document.getElementById("texto-inicial");

// Guarda posição antes de abrir o painel
let scrollAntes = 0;

// Renderizar cards
function carregarCards() {
    lista.innerHTML = "";

    pokemonsIniciais.forEach(poke => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3 class="card-title">${poke.nome}</h3>
            <button class="button">Dados do Pokémon</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            scrollAntes = window.scrollY; // salva posição antes
            getPokemonData(poke.id);
        });

        lista.appendChild(card);
    });
}

// Buscar dados
function getPokemonData(idPokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then(res => res.json())
        .then(json => {
            const pokemon = {
                nome: json.name,
                peso: json.weight,
                img: json.sprites.other["official-artwork"].front_default,
                hp: json.stats[0].base_stat,
                velocidade: json.stats[5].base_stat,
                defesa: json.stats[2].base_stat,
                ataque: json.stats[1].base_stat
            };

            mostrarPokemon(pokemon);
        });
}

// Mostra informações do Pokémon
function mostrarPokemon(p) {

    // Remove texto inicial
    if (textoInicial) {
        textoInicial.style.display = "none";
    }

    info.innerHTML = `
        <h2 style="text-transform: capitalize;">${p.nome}</h2>
        <p><strong>Peso:</strong> ${p.peso}</p>
        <p><strong>HP:</strong> ${p.hp}</p>
        <p><strong>Velocidade:</strong> ${p.velocidade}</p>
        <p><strong>Defesa:</strong> ${p.defesa}</p>
        <p><strong>Ataque:</strong> ${p.ataque}</p>
        <img src="${p.img}" style="width:180px; display:block; margin:10px auto;">
        
        <button id="voltar-btn" onclick="voltarScroll()" 
            style="margin-top:15px; display:block; margin-left:auto; margin-right:auto;">
            Voltar
        </button>
    `;

    // Rolagem até o painel (NÃO até o topo!)
    const y = info.getBoundingClientRect().top + window.scrollY - 20;

    window.scrollTo({
        top: y,
        behavior: "smooth"
    });
}

// Voltar exatamente onde estava
function voltarScroll() {
    window.scrollTo({
        top: scrollAntes,
        behavior: "smooth"
    });
}

carregarCards();
