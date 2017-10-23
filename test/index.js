const fs = require('fs')
const path = require('path')
const dataPath = require('../src/config/data')()

function init () {
  fs.writeFileSync(path.join(dataPath, 'test.csv'), 'test@example.com')
  fs.writeFileSync(path.join(dataPath, 'test.html'), 'this is a test')
}

init()

require('./mail')
require('./log')
