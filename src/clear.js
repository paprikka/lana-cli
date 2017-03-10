const proc = require('./utils/process')
function clear () {
    proc.stdout.write('\x1Bc')
}

module.exports = clear