const Log = require('../src/class/Log')
module.exports = (() => {
  const log = new Log('test')
  log.list()
    .then(response => {
      console.log(response)
      assert(response.indexOf('test@example.com') !== -1)
    })
    .catch(error => console.log(error))
})()
