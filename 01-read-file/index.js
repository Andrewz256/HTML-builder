const fs = require('fs');
const path = require('path');
let path1 = path.resolve(__dirname,"text.txt");
function read(path, code) {
    const readableStream = fs.createReadStream(path, code);
    readableStream.on('data', (stream) => {
        console.log(stream);
    })
}

read(path1, "utf8");