const fs = require('fs');

// Creating directories
fs.mkdir('stuff', function(){
	fs.readFile('readMe.txt', 'utf8', function(err, data) {
		fs.writeFile('writeMe.txt', data);
	});
});

// Removing directories
fs.rmdir('stuff');

// Reading Directories
fs.readdir('stuff', (err, data) => {
	fs.appendFileSync('greeting.txt', data);
});

// Deleting files from directories
fs.readdir('stuff', (err, data) => {
	fs.unlink('writeMe.txt');
});

