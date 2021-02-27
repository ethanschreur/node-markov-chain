/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		let chains = {};
		for (let i of this.words) {
			chains[i] = [];
		}
		for (var i = 0; i < this.words.length; i++) {
			let value = this.words[i + 1] == undefined ? null : this.words[i + 1];
			chains[this.words[i]].push(value);
		}
		this.chains = chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO
		let words = [ this.words[Math.floor(Math.random() * this.words.length)] ];
		for (let i = 0; i < numWords - 1; i++) {
			let prev_word = words[i];
			let ind = Math.floor(Math.random() * this.chains[prev_word].length);
			let next_word = this.chains[prev_word][ind] == undefined ? 'end' : this.chains[prev_word][ind];
			if (next_word != 'end') {
				words.push(next_word);
			} else {
				break;
			}
		}
		return words.join(' ');
	}
}

module.exports = { MarkovMachine };
