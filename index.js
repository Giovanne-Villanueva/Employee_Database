const CLI = require('./lib/cli.js');
const {intro} = require('./lib/textBuild.js')
const cli = new CLI();

intro();
cli.loadData();
cli.run();