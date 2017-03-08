const chalk = require('chalk')
const log = require('./log')
const clear = require('./clear')

const bye = () => {
    clear()
    log(chalk.red(
        `
    ${chalk.bold('Error:')}
    Could not find ${chalk.bold('package.json')} in current
    or parent dir.
`
    ))
    process.exit(1)
}

module.exports = bye