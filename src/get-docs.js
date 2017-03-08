const path = require('path')
const fs = require('fs')

const getDocs = root => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(root, 'README.md'), 'utf8', (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = getDocs