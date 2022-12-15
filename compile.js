const fs = require('fs');

let subscriptions = "";

const header = fs.readFileSync('header.txt', {encoding:'utf8', flag:'r'});

subscriptions += header;

const files = fs.readdirSync('filters');

files.forEach(file => {
    const data = fs.readFileSync('filters/' + file, {encoding:'utf8', flag:'r'});

    subscriptions += "!------ filters/" + file + " ------\n";
    subscriptions += data;
});

fs.writeFileSync('template/subscriptions.txt', subscriptions);
