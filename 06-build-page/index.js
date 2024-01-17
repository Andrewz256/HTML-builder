const fs = require('fs');
const path = require('path');

const resultDir = path.resolve(__dirname, "project-dist");
fs.stat(resultDir, (err) => {
    if (!err) {
        return console.log("resultDir exist");
    } else {
        fs.mkdir(resultDir, (err) => {
            if (err) {
                return console.error(err);
            }
        }); 
    }
})

const stylesPath = path.resolve(__dirname, "styles");
const assetsPath = path.resolve(__dirname, "assets");
const assetsNewPath = path.resolve(resultDir,"assets");

fs.stat(assetsNewPath, (err) => {
    if (!err) {
        return console.log("assetsNewPath exist");
    } else {
        fs.mkdir(assetsNewPath, (err) => {
            if (err) {
                return console.error(err);
            }
        }); 
    }
})
fs.readdir(assetsNewPath, (err, folders) => {
    if (err) {
        console.log ("assetsNewPath empty")
    } else {
        for (let folder of folders) {
            fs.rm(path.join(assetsNewPath, folder), { recursive: true }, err => {
              if (err) throw err;
            });
          }
    }
    

    console.log("clean folder assets")
  });
const stylesBundle = path.resolve(resultDir, "style.css");
fs.truncate(stylesBundle, err => {
    if(err) {
        fs.writeFile(stylesBundle, "", 'utf8', function (err) {
            if (err) return console.log(err);
        });
    } 
    console.log('clean bundle.css');
 });
const templateHTML = path.resolve(__dirname, "template.html");
const componentsHTML = path.resolve(__dirname, "components");
const indexHTML = path.resolve(resultDir, "index.html");
const templateHTMLread = fs.createReadStream(templateHTML, 'utf8');

templateHTMLread.on('data', data => {
    string = '';
    string = data.toString();
    fs.readdir(componentsHTML, {withFileTypes: true}, (err,files) =>{
        if (err) return console.log(err);
        files.forEach(file =>{
            let component =  file.name.split('.').slice(0,1).toString();
            console.log(`find ${component} component`);
            fs.createReadStream(path.resolve(componentsHTML, file.name), "utf-8").on("data", data => {
                string = string.replace(`{{${component}}}`, data);
                fs.writeFile(indexHTML, string, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            })
        })
    })
})

fs.readdir(stylesPath, {withFileTypes: true}, (err,files) => {
    if (err) throw err;
    files.forEach(file => {
        console.log(file.name);
        if (file.isFile && file.name.split('.').pop()=="css"){
            let oldFile = path.resolve(stylesPath,`${file.name}`)
            fs.createReadStream(oldFile, "utf8").pipe(fs.createWriteStream(stylesBundle, { 'flags': 'a' }));
        }

    });
});

fs.readdir(assetsPath,  {withFileTypes: true}, (err,folders) => {
    if (err) throw err;
    folders.forEach(folder => {
        let newFolder = path.resolve(assetsNewPath,`${folder.name}`);
        let oldFolder = path.resolve(assetsPath,`${folder.name}`);
        console.log(`copy ${folder.name}`);
        fs.mkdir(newFolder, { recursive: true}, (err) => {
            if (err) {return console.error(err);
            }
        });
        
        fs.readdir(oldFolder, (err,files) => {
            if (err) throw err;
            files.forEach(file => {
                let newFile = path.resolve(newFolder,`${file}`)
                let oldFile = path.resolve(oldFolder,`${file}`)
                console.log(file);
                fs.createReadStream(oldFile).pipe(fs.createWriteStream(newFile));
            });
        });
    });
});

