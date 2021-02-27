/** Command-line tool to generate Markov text. */
const axios = require('axios');
const fs = require('fs');
const { MarkovMachine } = require('./markov');

async function processURL(url) {
	try {
		let resp = await axios.get(url);
		// runMachine(resp.data);
		let m = new MarkovMachine(resp.data);
		const words = m.makeText(20);
		console.log(words);
	} catch (err) {
		console.log(`There was a problem receiving the data.\n This is the error: ${err}`);
		process.exit(1);
	}
}

function processFile(file) {
	fs.readFile(file, 'utf8', function(err, data) {
		if (err) {
			console.log(`There was a problem reading the file.\nThis is the error: ${err}`);
			process.exit(1);
		} else {
			let k = 'aaaa' + data;
			let m = new MarkovMachine(data);
			const words = m.makeText(20);
			console.log(words);
		}
	});
}

if (process.argv[2] === 'file') {
	processFile(process.argv[3]);
} else if (process.argv[2] == 'url') {
	processURL(process.argv[3]);
}
