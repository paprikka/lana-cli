const chalk = require('chalk')
const meow = require('meow')

const clear = () => process.stdout.write('\033c')
const log = console.log
clear()

const cli = meow(`
    ${chalk.bold('Usage:')}
        $ pashm

    ${chalk.bold('Examples:')}
        $ pashm

    Well, that's it. Just type ${chalk.bold.blue('pashm')},
    hit enter and scroll through a list of available scripts.
    \n

`)

const {keys} = Object
const scripts2list = scripts => (
    keys(scripts)
        .map( 
            name => ( { name, script: scripts[name] } )
        )
)

const pkg = require('./package.json')
const state = {
    scripts: scripts2list(pkg.scripts || []),
    selectedInd: 0
}

const renderItem = script => (
    `${chalk.bold(script.name.trim())}: ${chalk.gray(script.script)}`
)



const renderState = newState => (
    log(`
    ${chalk.bold.blue('Available scripts:')}

    ${newState.scripts.map(renderItem).join('\n    ')}

    `)
)

renderState(state)