const fs = require('fs');

const fetchNotes = () => {
	try {
		return JSON.parse(fs.readFileSync(('notes.txt')));
	} catch (err) {
		return [];
	}
}

const addingNotes = (dir, title, body) => {
	
	var notes = fetchNotes();

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

	var notes = fetchNotes();

	const filteredNotes = notes.filter((note) => note.title !== title);

	fs.writeFileSync(`${dir}/notes.txt`, JSON.stringify(filteredNotes));
}

const readNotes = (title) => {

	var notes = fetchNotes();

	const filteredNotes = notes.filter((note) => note.title === title);

	// console.log(`Title: ${filteredNotes[0].title} Body: ${filteredNotes[0].body}`);

	logNote(filteredNotes[0]);
}

const editNotes = (dir, title, body) => {

	var notes = fetchNotes();

	var note = {
		title,
		body
	};

	const filteredNotes = notes.filter((note) => note.title !== title);

	notes.push(filteredNotes);

	if (filteredNotes.length !== 0){

		notes.push(note);

		fs.writeFileSync(`${dir}/notes.txt`, JSON.stringify(notes));

		logNote(note);
	} else {
		console.log("Title doesnt exist");
	}
}

const getAll = () => {

	var notes = fetchNotes();

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