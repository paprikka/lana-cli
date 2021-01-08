const log = require('./log')
const clear = require('./clear')
const chalk = require('chalk')


const renderItem = ({ label, name }, isSelected) => {
    if (isSelected) return chalk.blue.bold(`• ${name}: ${label} `)
    return chalk.white(`  ${name}: `) + chalk.gray(label)
}

const bold = str => chalk.bold(str)
const getUpdateMessage = (update) => {
    if (!update) return ''
    return chalk.red(
        `
    Hey Friend, a new version ${bold(`[${update}]`)} is available.

    Run: ${bold('npm -g i lana-cli')} or ${bold('yarn global add lana-cli')}
    to get the latest version.
`
    )
}

const readmeMissingOrInvalid = () =>
    chalk.yellow(
        `
    README.md script descriptions are ${chalk.bold('not')} used.
    Check https://github.com/paprikka/lana-cli for more details.
`
    )

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
  ${newState.readmeMissingOrInvalid ? readmeMissingOrInvalid(newState.warningMessage) : ''}
  ${getUpdateMessage(newState.update)}
    `)
}

module.exports = renderState