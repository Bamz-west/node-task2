const fs = require('fs');

const fetchNotes = (dir) => {
	try {
		return JSON.parse(fs.readFileSync((`${dir}/notes.txt`)));
	} catch (err) {
		return [];
	}
}

const addingNotes = (dir, title, body) => {
	
	var notes = fetchNotes(dir);

	var note = {
		title,
		body
	};

	var double = notes.filter((note) => note.title === title);

	if (double.length === 0) {

		notes.push(note);

		fs.writeFileSync(`${dir}/notes.txt`, JSON.stringify(notes));

		logNote(note);
	} else {
		console.log("Title already exists");
	}

}

const removeNotes = (dir, title) => {

	var notes = fetchNotes(dir);

	const filteredNotes = notes.filter((note) => note.title !== title);

	fs.writeFileSync(`${dir}/notes.txt`, JSON.stringify(filteredNotes));
}

const readNotes = (dir, title) => {

	var notes = fetchNotes(dir);

	const filteredNotes = notes.filter((note) => note.title === title);

	// console.log(`Title: ${filteredNotes[0].title} Body: ${filteredNotes[0].body}`);

	logNote(filteredNotes[0]);
}

const editNotes = (dir, title, body) => {

	var notes = fetchNotes(dir);

	var note = {
		title,
		body
	};

	const filteredNotes = notes.filter((note) => note.title !== title);

	filteredNotes.push(note);

	if (filteredNotes.length !== 0){

		notes.push(filteredNotes);

		fs.writeFileSync(`${dir}/notes.txt`, JSON.stringify(notes));

		logNote(note);
	} else {
		console.log("Title doesnt exist");
	}
}

const getAll = (dir) => {

	var notes = fetchNotes(dir);

	notes.forEach((note) => logNote(note));
}

const logNote = (note) => {

	console.log('***************************')
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	addingNotes,
	removeNotes,
	readNotes,
	getAll,
	editNotes
}