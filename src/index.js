'use strict'

const chalk = require('chalk')
const meow = require('meow')
const keypress = require('keypress')
const clear = require('./clear')

clear()

meow(`
    ${chalk.bold('Usage:')}
        $ pashm

    ${chalk.bold('Examples:')}
        $ pashm

    Well, that's it. Just type ${chalk.bold.blue('pashm')},
    hit enter and scroll through a list of available scripts.
    \n

`)


const scripts2list = require('./scripts2list')
const pkg = require('../package.json')
const renderState = require('./render-state')
const runScript = require('./run-script')

const state = {
    scripts: scripts2list(pkg.scripts || []),
    selectedInd: 0
}

renderState(state)

keypress(process.stdin)

const {min, max} = Math

process.stdin.on('keypress', (ch, key) => {
    const isEscape = (key && key.ctrl && key.name == 'c') || key.name == 'escape'
    if (isEscape) {
        process.stdin.pause()
    }

    if(key.name == 'up') {
        state.selectedInd = max(0, state.selectedInd - 1)
        renderState(state)
        return
    }
    if(key.name == 'down') {
        state.selectedInd = min(state.scripts.length - 1, state.selectedInd + 1)
        renderState(state)
        return
    }
    if(key.name == 'return') {
        process.stdin.pause()
        runScript(state.scripts[state.selectedInd])
    }
})



process.stdin.setRawMode(true)
process.stdin.resume()