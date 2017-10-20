var request = require('request');

if (process.argv.length < 4) {
    console.log('Usage: node index.js sender number1 [number2 ...]');
}

const apiKey = process.env.SWISSCOM_API_KEY;

if (!apiKey) {
    console.log('Please provide the Swisscom API key in the environment variable SWISSCOM_API_KEY');
}

const sender = process.argv[2];
const numbers = process.argv.slice(3);


let message = '';
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) {
	message += chunk;
    }
});

function sendMessage(sender, message, number) {
    const payload = {
	from: sender,
	to: number.replace(/ /g, ''),
	text: message
    };
    const options = {
	uri: 'https://api.swisscom.com/messaging/sms',
	headers: {
	    client_id: apiKey,
	    'Content-Type': 'application/json',
	    'SCS-Version': '2'
	},
	body: JSON.stringify(payload),
	method: 'POST'
    };
    request(options, function (err, res, body) {
	if (err) {
	    console.log(JSON.stringify(err));
	}
	if (body) {
	    console.log(body);
	}
    });
}

function sendMessages(sender, message, numbers) {
    console.log('Sending message: ' + message);
    for (const number of numbers) {
	console.log('Sending SMS to ' + number);
	sendMessage(sender, message, number);
    }
}

process.stdin.on('end', () => {
    sendMessages(sender, message, numbers);
});
