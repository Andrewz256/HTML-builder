const fs = require('fs');
const path = require('path');

const path1 = path.resolve(__dirname, "styles");
const path2 = path.resolve(__dirname,"project-dist","bundle.css");
fs.truncate(path2, err => {
    if(err) {
        fs.writeFile(path2, "", 'utf8', function (err) {
            if (err) return console.log(err);
        });
    }
    console.log('clean');
 });

console.log(path2);
fs.readdir(path1, {withFileTypes: true}, (err,files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.isFile && file.name.split('.').pop()=="css"){
            console.log(`copy ${file.name}`);
            let oldFile = path.resolve(path1,`${file.name}`)
            fs.createReadStream(oldFile, "utf8").pipe(fs.createWriteStream(path2, { 'flags': 'a' }));
        }

    });
});