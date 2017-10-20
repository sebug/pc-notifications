var request = require('request');

if (process.argv.length < 3) {
    console.log('Usage: node index.js number1 [number2 ...]');
}

const apiKey = process.env.SWISSCOM_API_KEY;

if (!apiKey) {
    console.log('Please provide the Swisscom API key in the environment variable SWISSCOM_API_KEY');
}

const numbers = process.argv.slice(2);


let message = '';
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) {
	message += chunk;
    }
});

function sendMessages(message, numbers) {
    console.log('Sending message: ' + message);
    for (const number of numbers) {
	console.log('Sending SMS to ' + number);
    }
}

process.stdin.on('end', () => {
    sendMessages(message, numbers);
});
