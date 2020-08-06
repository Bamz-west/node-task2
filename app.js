const http = require('http');
const fs = require('fs');

const notes = require('./notes');

const server = http.createServer((req, res) => {
	console.log(req.url);
    if(req.url === '/' && req.method === 'GET') {
        let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);
        });
        req.on("end", () => {
        	const dir = JSON.parse(data).dir;
        	fs.readdir(dir, (err, data) => {
            	if (err) throw err;
            	notes.getAll();
            });
            res.end('done');
        });
    } else if (req.url === '/dir' && req.method === 'POST') {
        let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);
        });
        console.log(data);
        req.on("end", () => {
        	const dir = JSON.parse(data).dir;
            fs.mkdir(dir, (err, data) => {
            	if (err) throw err;
            });
            res.end('done');
        });
    } else if (req.url === '/note' && req.method === 'GET') {
        let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);
        });
        req.on("end", () => {
            const dir = JSON.parse(data).dir;
            const title = JSON.parse(data).title;
            fs.readdir(dir, (err, data) => {
                if (err) throw err;
                notes.readNotes(title);
            });
            res.end('done');
        });
    } else if (req.url === '/note' && req.method === 'POST') {
        let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);
        });
        console.log(data);
        req.on("end", () => {
        	const dir = JSON.parse(data).dir;
            const title = JSON.parse(data).title;
            const body = JSON.parse(data).body;
            fs.readdir(dir, (err, data) => {
            	if (err) throw err;
            	notes.addingNotes(dir, title, body);
            });
            res.end('done');
        });
    } else if (req.url === '/note' && req.method === 'PATCH') {
        let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);
        });
        console.log(data);
        req.on("end", () => {
            const dir = JSON.parse(data).dir;
            const title = JSON.parse(data).title;
            const body = JSON.parse(data).body;
            fs.readdir(dir, (err, data) => {
                if (err) throw err;
                notes.editNotes(dir, title, body);
            });
            res.end('done');
        });
    } else if (req.url === '/note' && req.method === 'DELETE') {
    	let data = [];
        req.on("data", (chunk) => {
            data.push(chunk);
        });
        req.on("end", () => {
        	const dir = JSON.parse(data).dir;
        	const title = JSON.parse(data).title;
        	fs.readdir(dir, (err, data) => {
            	if (err) throw err;
            	notes.removeNotes(dir, title);
            })
            res.end('done');
        })
    }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});