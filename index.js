const chalk = require('chalk')
const meow = require('meow')
const keypress = require('keypress')

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

const { keys } = Object
const scripts2list = scripts => (
    keys(scripts)
        .map(
        name => ({ name, script: scripts[name] })
        )
)

const pkg = require('./package.json')
const state = {
    scripts: scripts2list(pkg.scripts || []),
    selectedInd: 0
}

const renderItem = ({ script, name }, isSelected) => {
    if (isSelected) return chalk.bgBlue.white.bold(` ${name}: ${script} `)
    return chalk.white(` ${name}: `) + chalk.gray(script) + ' '
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

const runScript = ({name, script}) => {
    clear()
    log(chalk.bgGreen.white(` Starting script [${name}]... `))
    const childProcess = require('child_process').spawn('npm', ['run', name])
    childProcess.stdout.pipe(process.stdout)
    process.stdin.pipe(childProcess.stdin)
    childProcess.addListener('exit', (code) => process.exit(code))
}

renderState(state)

keypress(process.stdin)
const {min, max} = Math
process.stdin.on('keypress', (ch, key) => {
    const isEscape = (key && key.ctrl && key.name == 'c') || key.name == 'escape'
    if (isEscape) {
        process.stdin.pause();
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
        process.stdin.pause();
        runScript(state.scripts[state.selectedInd])
    }
});



process.stdin.setRawMode(true);
process.stdin.resume();


