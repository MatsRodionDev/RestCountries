const searchInput = document.getElementById('search');
const countriesDiv = document.getElementById('countries');
const button = document.getElementById('button');

button.addEventListener('click', () => {
    console.log('dndn')
    countriesDiv.innerHTML = '';
    searchInput.value = '';
})
document.addEventListener('DOMContentLoaded', async () => {
   
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        
        const countries = await response.json();
        console.log(countries.log)
        displayCountries(countries);
    } catch (error) {
        countriesDiv.innerHTML = '<p>Error retrieving data.</p>';
    }
});

searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        if (query.length < 2) {
            countriesDiv.innerHTML = ''; // Очистить результат, если меньше 2 символов
            return;
        }

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            countriesDiv.innerHTML = '<p>Ошибка получения данных.</p>';
        }
    }
});

function displayCountries(countries) {
    countriesDiv.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.svg}" alt="Flag ${country.name.common}" />
            <p>Capital: ${country.capital ? country.capital[0] : 'No data'}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
        `;
        countriesDiv.appendChild(countryCard);
    });
}
