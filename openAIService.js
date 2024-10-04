const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to get OpenAI response
async function fetchOpenAIResponse(message) {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        return 'Sorry, I could not process your request at the moment.';
    }
}

module.exports = { fetchOpenAIResponse };
