const fs = require('fs');

const template = 'template/subscriptions.txt';

fs.writeFileSync(
    template,
    fs.readFileSync('header.txt', {encoding:'utf8', flag:'r'}) + "\n"
);

const files = fs.readdirSync('filters');

files.forEach(file => {
    fs.appendFileSync(
        template,
        "!------ filters/" + file + " ------\n" +
        fs.readFileSync('filters/' + file, {encoding:'utf8', flag:'r'}) +
        "\n"
    );
});

fs.unlinkSync('template/.gitkeep');
