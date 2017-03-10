
const runScript = ({name}) => {
    const clear = require('./clear')
    const log = require('./log')
    const chalk = require('chalk')
    const proc = require('./utils/process')
    const getScriptCommand = require('./get-script-command')
    const npmCMD = getScriptCommand()
    
    clear()
    log(chalk.bgGreen.white(` Starting script [${name}]... `))
    const opts = { stdio: ['pipe', 1, 2, 'ipc'] }

    const childProcess = require('child_process').spawn(npmCMD, ['run', name], opts)
    proc.stdin.pipe(childProcess.stdin)
    childProcess.addListener('exit', (code) => proc.exit(code))
    childProcess.addListener('error', (err) => {
        log(err)
        proc.exit(err.code || 1)
    })
}

module.exports = runScript