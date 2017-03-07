'use strict'

const chalk = require('chalk')
const meow = require('meow')
const keypress = require('keypress')
const clear = require('./clear')
const log = require('./log')
const scripts2list = require('./scripts2list')
const renderState = require('./render-state')
const runScript = require('./run-script')
const findPackageJSON = require('find-package-json')
const finder = findPackageJSON(process.cwd()).next()

const initCLITools = () => {
    clear()

    meow(`
        ${chalk.bold('Usage:')}
            $ lana

        Well, that's it. Just type ${chalk.bold.blue('lana')},
        hit ${chalk.bold.blue('[enter]')} and scroll through a list of available scripts.

        Hit ${chalk.bold.blue('[escape]')} or ${chalk.bold.blue('[ctrl + c]')} to exit.

        \n

    `)
}

const bye = () => {
    log(chalk.red(
`
    ${chalk.bold('Error:')}
    Could not find ${chalk.bold('package.json')} in current
    or parent dir.
`        
    ))
    process.exit(1)
}

const init = () => {
    const pkg = finder.value
    const state = {
        scripts: scripts2list(pkg.scripts || []),
        selectedInd: 0
    }

    renderState(state)

    keypress(process.stdin)

    const { min, max } = Math

    const handleKeyPress = (ch, key) => {
        const isEscape = (key && key.ctrl && key.name == 'c') || key.name == 'escape'
        if (isEscape) {
            process.stdin.pause()
        }

        if (key.name == 'up') {
            state.selectedInd = max(0, state.selectedInd - 1)
            renderState(state)
            return
        }
        if (key.name == 'down') {
            state.selectedInd = min(state.scripts.length - 1, state.selectedInd + 1)
            renderState(state)
            return
        }
        if (key.name == 'return') {
            process.stdin.pause()
            process.stdin.removeListener('keypress', handleKeyPress)
            process.stdin.setRawMode(false)
            process.stdin.resume()
            runScript(state.scripts[state.selectedInd])
        }
    }

    process.stdin.addListener('keypress', handleKeyPress)
    process.stdin.setRawMode(true)
    process.stdin.resume()
}

initCLITools()

const packageNotFound = finder.done && finder.value == null
if (packageNotFound) {
    bye()
} else {
    init()
}

