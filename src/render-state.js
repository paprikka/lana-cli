const log = require('./log')
const clear = require('./clear')
const chalk = require('chalk')

const renderItem = ({ label, name }, isSelected) => {
    if (isSelected) return chalk.bgBlue.white.bold(` ${name}: ${label} `)
    return chalk.white(` ${name}: `) + chalk.gray(label) + ' '
}

const renderState = newState => {
    clear()
    const scriptList = newState.scripts
        .map((script, ind) => {
            const isSelected = newState.selectedInd == ind
            return renderItem(script, isSelected)
        })
        .join('\n   ')

    log(`
    ${chalk.bold.blue('Available scripts:')}

   ${scriptList}

    `)
}

module.exports = renderState