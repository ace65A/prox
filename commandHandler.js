const { fetchOpenAIResponse } = require('./openAIService');
const { getProxiesByCountry } = require('./proxyService');
const { sendTelegramMessage } = require('./telegramService');

// Command handler function
function handleCommand(command, socket) {
    if (command.startsWith('/subscribe')) {
        const duration = command.split(' ')[1];
        if (duration === '3days') {
            socket.emit('botMessage', 'Thank you for choosing the 3-day plan. Please make your payment here: [PAYMENT_LINK]');
            sendTelegramMessage('User has subscribed to the 3-day plan.');
        } else if (duration === '1week') {
            socket.emit('botMessage', 'Thank you for choosing the 1-week plan. Please make your payment here: [PAYMENT_LINK]');
            sendTelegramMessage('User has subscribed to the 1-week plan.');
        } else {
            socket.emit('botMessage', 'Invalid subscription duration. Please type "/subscribe 3days" or "/subscribe 1week".');
        }
    } else if (command.startsWith('/proxy')) {
        const country = command.split(' ')[1];
        getProxiesByCountry(country).then(proxyList => {
            const response = proxyList ? `Here are the proxies for ${country}: ${proxyList}` : `No proxies found for ${country}`;
            socket.emit('botMessage', response);
        });
    } else if (command === '/help') {
        socket.emit('botMessage', 'Available commands: /subscribe [duration], /proxy [country]');
    } else {
        fetchOpenAIResponse(command).then(response => {
            socket.emit('botMessage', response);
        });
    }
}

module.exports = { handleCommand };
