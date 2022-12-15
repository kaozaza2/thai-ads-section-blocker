const fs = require('fs');

let subscriptions = "";

const header = fs.readFileSync('header.txt', {encoding:'utf8', flag:'r'});

subscriptions += header;

const files = fs.readdirSync('filters');

for (const file in files) {
    const data = fs.readFileSync('header.txt', {encoding:'utf8', flag:'r'});

    subscriptions += "!------ filters/" + file + " ------";
    subscriptions += data;
}

fs.writeFileSync('template/subscriptions.txt', subscriptions);
