const getScriptCommand = () => require('./utils/is-windows')() ? 'npm.cmd' : 'npm'

module.exports = getScriptCommand