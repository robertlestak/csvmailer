const path = require('path')
module.exports = () => {
  let dataPath
  if (process.env.ENV === 'production') {
    dataPath = path.join('/', 'data')
  } else {
    dataPath = path.join(__dirname, '..', '..', 'data')
  }
  return dataPath
}
