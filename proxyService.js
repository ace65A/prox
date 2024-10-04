const axios = require('axios');

// Example with ProxyScrape API (you can replace this with another API service)
const PROXY_API_URL = 'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=1000&country={country}&ssl=all&anonymity=all';

async function getProxiesByCountry(country) {
    try {
        // Replace {country} with the actual country code in lowercase (e.g., 'us' for the USA)
        const url = PROXY_API_URL.replace('{country}', country.toLowerCase());
        
        // Fetch proxy list from the API
        const response = await axios.get(url);

        // Extract proxies and return them as an array
        const proxies = response.data.split('\n').filter(Boolean);
        return proxies.length ? proxies : null;
    } catch (error) {
        console.error('Error fetching proxies:', error.message);
        return null;
    }
}

module.exports = { getProxiesByCountry };
