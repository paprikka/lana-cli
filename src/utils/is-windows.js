const proc = require('./process')
const isWindows = () => !!/^win/.test(proc.platform)

module.exports = isWindows