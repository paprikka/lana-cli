const clear = require('./clear')
const log = require('./log')
const chalk = require('chalk')

const runScript = ({name}) => {
    clear()
    log(chalk.bgGreen.white(` Starting script [${name}]... `))
    const childProcess = require('child_process').spawn('npm', ['run', name])
    childProcess.stdout.pipe(process.stdout)
    process.stdin.pipe(childProcess.stdin)
    childProcess.addListener('exit', (code) => process.exit(code))
}

module.exports = runScript