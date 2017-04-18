const proc = require('./utils/process')
function clear () {

    // Workaround for Windows with Node version 6
    // Based on: https://gist.github.com/KenanSulayman/4990953
    // Fixes: https://github.com/paprikka/lana-cli/issues/5
    const isWindows = process.platform === 'win32'
    const isNode6 = Number(proc.version.slice(1, 2)) >= 6
    const applyWorkaround = isWindows && isNode6

    if (applyWorkaround) {
        // clear terminal, reset cursor
        proc.stdout.write('\x1B[2J\x1B[0f')
    } else {
        proc.stdout.write('\x1Bc')
    }
}

module.exports = clear