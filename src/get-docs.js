
const getDocs = root => {
    const path = require('path')
    const fs = require('fs')

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(root, 'README.md'), 'utf8', (err, data) => {
            if(err && err.code == 'ENOENT') return reject(new Error('NO_DOCS_AVAILABLE'))
            if (err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = getDocs