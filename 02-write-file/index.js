const fs = require('fs');
const path = require('path');
const readline = require('readline');

const path1 = path.resolve(__dirname, 'text.txt');
const output1 = fs.createWriteStream(path1);

const readline1 = readline.createInterface(process.stdin, process.stdout);

readline1.question(
  'Введи текст ( Ctrl+c или exit для выхода) !!!: \n',
  (string) => {
    if (string.trim() === 'exit') {
      readline1.close();
    } else {
      output1.write(`${string}\n`);
      readline1.setPrompt('Введи еще текст!!!: \n');
      readline1.prompt();
      readline1.on('line', (string) => {
        if (string.trim() === 'exit') {
          readline1.close();
        } else {
          readline1.setPrompt('Введи еще текст!!!: \n');
          output1.write(`${string}\n`);
          readline1.prompt();
        }
      });
    }
  },
);

process.on('exit', () => {
  console.log('\nПока, _username_, приходите еще');
});
