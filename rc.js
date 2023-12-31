const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 5005});
const fs = require('fs');
const path = require('path');
const os = require('os');
const workPath = path.resolve('..');
const { Readable } = require('stream');
const { exec } = require("child_process");

const MAX_WS_BINARY = 52428800;

let upload = 0;
let uploads = { name: null, path: null };

function ls(path) {
	return fs.readdirSync(path)
}

function createDir(name, pt) {
	pt = pt ? pt : path.resolve();
	return fs.mkdir(`${pt}/${name}`, { recursive: true }, (err) => {
    if(err) {
    	return 0;
    }
    return 1;
	});
}

function removeFile(path) {
	fs.unlinkSync(path);
}
function removeDir(path) {
	fs.rmSync(path, { recursive: true, force: true });
}

wsServer.on('connection', onConnect);

async function onConnect(ws, req) {
	ws.on('message', function(message) {
		if(message.indexOf('{') > -1 && message.indexOf('{') < 2) {
			let get = JSON.parse(message)
			
			if(get.type == "cmd") {
				exec(get.pipe, (error, stdout, stderr) => {
					if(error) {
						console.log(error)
						ws.send(JSON.stringify({type: 'cmd', pipe: 'Error'}))
					}
					if(stdout) {
						ws.send(JSON.stringify({type: 'cmd', pipe: stdout}))
					}
					if(stderr) {
						console.log(stderr)
					}
				})
			}
			if(get.type == "findtermux") {
				ws.send(JSON.stringify({type: 'findtermux', json: {name: os.hostname(), arch: os.machine(), platform: os.platform()}}))
			}
			if(get.type == "ping") {
				ws.send(JSON.stringify({type: 'ping', pipe: get.pipe}))
			}
			if(get.type == "getall") {
				ws.send(JSON.stringify({type: 'ls', pipe: ls(workPath), path: workPath}))
			}
			if(get.type == "toPath") {
				let t = ls(get.path)
				ws.send(JSON.stringify({type: 'toPath', pipe: t, path: get.path}))
			}
			if(get.type == "createDir") {
				createDir(get.name, get.path)
				ws.send(JSON.stringify({type: 'toPath', pipe: ls(get.path), path: get.path}))
			}
			if(get.type == "removeFolder") {
				removeDir(get.object)
				ws.send(JSON.stringify({type: 'toPath', pipe: ls(get.path), path: get.path}))
			}
			if(get.type == "removeFile") {
				removeFile(get.object)
				ws.send(JSON.stringify({type: 'toPath', pipe: ls(get.path), path: get.path}))
			}
			if(get.type == "Upload") {
				let name = get.name;
				let raw = get.pipe;
				let path = get.path;

				uploads.name = get.name;
				uploads.path= get.path;
				upload = 1;
				return;
			}
		}
		if(upload) {
				const buffer = Buffer.from(message, 'base64');
				const readable = new Readable();
				readable._read = () => {};
				readable.push(buffer);
				readable.push(null);

				let writeableStream = fs.createWriteStream(uploads.path + '/' + uploads.name);

				readable.pipe(writeableStream);
				ws.send(JSON.stringify({type: 'toPath', pipe: ls(uploads.path), path: uploads.path}))
				upload = 0;
				uploads.name = null;
				uploads.path= null;
		}
	})
	ws.on('close', function() {
		ws.close()
	})
}

function wsParser(parse) {
	let str = new URL(parse, 'ws://')
	let params = str.searchParams;
	return params;
}

let rand = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

console.log('>>>>>>>>>>> TERMUXRC ANDROID >>>>>>>>>>>>');
console.log('[5005] App Started');