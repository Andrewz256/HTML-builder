const fs = require('fs');
const path = require('path');
const path1 = path.resolve(__dirname, 'secret-folder');

fs.readdir(path1, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isDirectory() != true) {
      const fileSize = fs.stat(path.resolve(path1, file.name), (err, stats) => {
        if (err) return console.log(err);
        console.log(
          file.name.split('.').slice(0, 1) +
            ' ' +
            file.name.split('.').pop() +
            ' ' +
            stats.size / 1024 +
            'kb',
        );
      });
    }
  });
});
