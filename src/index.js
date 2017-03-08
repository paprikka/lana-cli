'use strict'

const chalk = require('chalk')
const meow = require('meow')
const keypress = require('keypress')
const clear = require('./clear')
const log = require('./log')
const scripts2list = require('./scripts2list')
const renderState = require('./render-state')
const runScript = require('./run-script')

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

const bye = require('./bye')

const getProjectRoot = cwd => {
    const findParentDir = require('find-parent-dir')

    return new Promise((resolve, reject) => {
        findParentDir(cwd, 'package.json', (err, dir) => {
            if (err) return reject(err)
            resolve(dir)
        })

    })
}

const getPackage = root => new Promise((resolve) => {
    const path = require('path')
    try {
        const pkg = require(path.join(root, 'package.json'))
        resolve(pkg)
    } catch (err) {
        throw new Error('PACKAGE_NOT_FOUND')
    }
})


const getInitialState = (root, pkg) => {
    const getDocs = require('./get-docs')

    const md2json = require('./md2json')
    return getDocs(root)
        .then(md2json)
        .then( docs => {
            const state = {
                scripts: scripts2list(pkg.scripts || [], docs),
                selectedInd: 0
            }
            return state
        })
}

const initInput = state => {
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

const init = ({ root, pkg }) => {
    getInitialState(root, pkg)
        .then(state => {
            renderState(state)
            initInput(state)
        })
}

initCLITools()
getProjectRoot(process.cwd())
    .then((root) => (
        getPackage(root).then((pkg) => ({ root, pkg }))
    ))
    .then(init)
    .catch(bye)


