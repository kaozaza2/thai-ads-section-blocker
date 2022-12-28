const fs = require('fs');

let subscriptions = "";

const header = fs.readFileSync('header.txt', {encoding:'utf8', flag:'r'});

subscriptions += header;
subscriptions += "\n";

const files = fs.readdirSync('filters');

files.forEach(file => {
    const data = fs.readFileSync('filters/' + file, {encoding:'utf8', flag:'r'});

    subscriptions += "!------ filters/" + file + " ------\n";
    subscriptions += data;
    subscriptions += "\n";
});

fs.writeFileSync('template/subscriptions.txt', subscriptions);
fs.unlinkSync('template/.gitkeep');
