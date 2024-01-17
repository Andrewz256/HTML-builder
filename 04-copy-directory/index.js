const fs = require('fs');
const path = require('path');

const path1 = path.resolve(__dirname,"files");
const path2 = path.resolve(__dirname,"files-copy");
fs.mkdir (path2, { recursive: true },(err) => {
    if (err) throw err;
})
fs.readdir(path2, (err, files) => {
    if (err) throw err;  
    for (let file of files) {
      fs.unlink(path.join(path2, file), err => {
        if (err) throw err;
      });
    }
    console.log("clean")
  });


fs.readdir(path1, (err,files) => {
    if (err) throw err;

    files.forEach(file => {
        let newFile = path.resolve(path2,`${file}`)
        let oldFile = path.resolve(path1,`${file}`)
        console.log(`copy ${file}`);
        fs.createReadStream(oldFile).pipe(fs.createWriteStream(newFile));
    });
});