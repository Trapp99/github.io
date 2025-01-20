function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('it-IT', options);
    const formattedTime = now.toLocaleTimeString('it-IT');
    document.getElementById('current-time').textContent = `${formattedDate} ${formattedTime}`;
}

setInterval(updateTime, 1000);
updateTime();

document.getElementById('theme-toggle-button').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});

// Gestione del pulsante di ritorno all'inizio della pagina
const backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Aggiorna l'anno corrente nel footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Selezione degli elementi del DOM
const searchButton = document.getElementById('search-button');
const searchModal = document.getElementById('search-modal');
const closeSearchModal = searchModal.querySelector('.close');
const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');
const searchResultsContainer = document.createElement('div'); // Per mostrare i risultati

// Aggiungiamo uno stile base per il contenitore dei risultati
searchResultsContainer.classList.add('search-results-container');
document.body.appendChild(searchResultsContainer);

// Funzione per aprire il modal di ricerca
function openSearchModal() {
    searchModal.style.display = 'block';
    searchInput.focus(); // Porta il focus sull'input
}

// Funzione per chiudere il modal di ricerca
function closeSearchModalFn() {
    searchModal.style.display = 'none';
    searchInput.value = ''; // Resetta il campo di input
    searchResultsContainer.style.display = 'none'; // Nascondi i risultati
}

// Event listener per il pulsante di apertura
searchButton.addEventListener('click', openSearchModal);

// Event listener per il pulsante di chiusura
closeSearchModal.addEventListener('click', closeSearchModalFn);

// Chiudi il modal quando l'utente clicca fuori
window.addEventListener('click', function (event) {
    if (event.target === searchModal) {
        closeSearchModalFn();
    }
});

// Funzione per ottenere risultati di ricerca reali tramite API
async function fetchSearchResults(query) {
    const apiKey = 'AIzaSyDxQpfRW9gzyvB9924qVmuevdTAEFvX9dA'; // Sostituisci con la tua chiave API
    const searchEngineId = 'https://cse.google.com/cse.js?cx=f19aee53850d6456f'; // Sostituisci con il tuo ID del motore di ricerca
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Errore nella risposta dell\'API');
        }
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Errore durante il fetch dei risultati:', error);
        return [];
    }
}

// Gestione del pulsante di invio della ricerca
searchSubmit.addEventListener('click', async function () {
    const query = searchInput.value.trim();

    if (query) {
        searchResultsContainer.style.display = 'block';
        searchResultsContainer.innerHTML = '<p>Caricamento risultati...</p>';

        const results = await fetchSearchResults(query);

        if (results.length > 0) {
            searchResultsContainer.innerHTML = `
                <h3>Risultati per: "${query}"</h3>
                <ul>
                    ${results.map(item => `
                        <li>
                            <a href="${item.link}" target="_blank">${item.title}</a>
                            <p>${item.snippet}</p>
                        </li>
                    `).join('')}
                </ul>
            `;
        } else {
            searchResultsContainer.innerHTML = '<p>Nessun risultato trovato.</p>';
        }
    } else {
        searchResultsContainer.style.display = 'block';
        searchResultsContainer.innerHTML = '<p>Inserisci un termine di ricerca valido.</p>';
    }
});
