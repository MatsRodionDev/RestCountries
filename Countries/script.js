const searchInput = document.getElementById('search');
const countriesDiv = document.getElementById('countries');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value;
    if (query.length < 2) {
        countriesDiv.innerHTML = ''; 
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        const countries = await response.json();
                displayCountries(countries);
    } catch (error) {
        countriesDiv.innerHTML = '<p>Ошибка получения данных.</p>';
    }
});

function displayCountries(countries) {
    countriesDiv.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.svg}" alt="Флаг ${country.name.common}" />
            <p>Столица: ${country.capital ? country.capital[0] : 'Нет данных'}</p>
            <p>Население: ${country.population.toLocaleString()}</p>
            <p>Регион: ${country.region}</p>
        `;
        countriesDiv.appendChild(countryCard);
    });
}