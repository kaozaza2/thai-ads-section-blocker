const fs = require('fs');

fs.readdir('filters', (err, files) => {
    let subscriptions = "";

    fs.readFile('header.txt', (er, data) => {
        subscriptions += data;
    });

    files.forEach(file => {
        fs.readFile(file, (er, data) => {
            subscriptions += "!------ filters/" + file + " ------";
            subscriptions += data;
        });
    });

    fs.writeFile('template/subscriptions.txt', subscriptions, err => console.log(err));
});
