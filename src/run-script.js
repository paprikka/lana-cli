const clear = require('./clear')
const log = require('./log')
const chalk = require('chalk')

const runScript = ({name}) => {
    clear()
    log(chalk.bgGreen.white(` Starting script [${name}]... `))
    const opts = { stdio: ['pipe', 1, 2, 'ipc'] }

    const childProcess = require('child_process').spawn('npm', ['run', name], opts)
    process.stdin.pipe(childProcess.stdin)
    childProcess.addListener('exit', (code) => process.exit(code))
    childProcess.addListener('error', (err) => {
        log(err)
        process.exit(err.code || 1)
    })
}

module.exports = runScript