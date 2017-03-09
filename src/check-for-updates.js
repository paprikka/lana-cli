const checkForUpdates = (pkg) => new Promise((resolve) => {
    const updateNotifier = require('update-notifier')
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24 // daily
    })

    if (notifier.update) return resolve(notifier.update.latest)
    resolve()
})


module.exports = checkForUpdates