const fs = require('fs')
const parse = require('csv-parse')
const path = require('path')

const dataPath = require('../config/data')()

class Emails {
  constructor (file) {
    this.file = file
  }

  parse () {
    return new Promise((resolve, reject) => {
      console.log('Parse CSV file')
      fs.readFile(path.join(dataPath, this.file), (err, data) => {
        if (err) return reject(err)
        parse(data.toString(), (err, results) => {
          if (err) return reject(err)
          resolve(results)
        })
      })
    })
  }
}

module.exports = Emails
