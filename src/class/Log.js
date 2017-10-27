const fs = require('fs')
const path = require('path')

const dataPath = require('../config/data')()

class Log {
  constructor (file, email, status) {
    this.file = file
    this.email = email
    this.status = status
  }

  list () {
    return new Promise((resolve, reject) => {
      if (!this.file) return reject('File Required')
      console.log('Get Log', this.file)
      fs.readFile(path.join(dataPath, this.file + '.log'), (err, data) => {
        if (err) return reject(err)
        resolve(data.toString())
      })
    })
  }

  emailExists () {
    return new Promise(async (resolve, reject) => {
      if (!this.file) return reject('File Required')
      if (!this.email) return reject('Email Required')
      try {
        console.log('Check if email exists', this.email)
        const list = await this.list()
        if (list.indexOf(this.email) === -1) {
          console.log('Email does not exist', this.email)
          return resolve(false)
        } else {
          console.log('Email exists', this.email)
          return resolve(true)
        }
      } catch (e) {
        if (e.message.indexOf('no such file or directory') !== -1) {
          return resolve(false)
        }
        return reject(e)
      }
    })
  }

  append () {
    return new Promise((resolve, reject) => {
      if (!this.file) return reject('File Required')
      if (!this.email) return reject('Email Required')
      console.log('Append email to log -', 'Email:', this.email)
      let logItem = `${Date.now()}    ${this.email}    ${this.status}\n`
      fs.appendFile(path.join(dataPath, this.file + '.log'), logItem, (err) => {
        if (err) return reject(err)
        resolve(this.email)
      })
    })
  }

}

module.exports = Log
