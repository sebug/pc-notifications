var request = require('request');

if (process.argv.length < 3) {
    console.log('Usage: node index.js number1 [number2 ...]');
}

const numbers = process.argv.slice(2);
for (const number of numbers) {
    console.log('Sending SMS to ' + number);
}



