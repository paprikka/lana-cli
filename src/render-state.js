const log = require('./log')
const clear = require('./clear')
const chalk = require('chalk')


const renderItem = ({ label, name }, isSelected) => {
    if (isSelected) return chalk.blue.bold(`• ${name}: ${label} `)
    return chalk.white(`  ${name}: `) + chalk.gray(label)
}

const bold = str => chalk.bold(str)
const getUpdateMessage = (update) => {
    if(!update) return ''
    return chalk.red(
`

    Hey Cowboy, an update ${bold(`[${update}]`)} is available.

    Run: ${bold('npm -g i lana-cli')} or ${bold('yarn global add lana-cli')}
    to get the latest version.
`
    )
}

const renderState = newState => {
    clear()
    const scriptList = newState.scripts
        .map((script, ind) => {
            const isSelected = newState.selectedInd == ind
            return renderItem(script, isSelected)
        })
        .join('\n  ')

    log(`
    ${chalk.bold.blue('Available scripts:')}

  ${scriptList}
  ${getUpdateMessage(newState.update)}
    `)
}

module.exports = renderState