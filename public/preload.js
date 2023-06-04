let { readdir, writeFile } = require('fs/promises')
let { readFile, readFileSync, readdirSync } = require('fs')
let { contextBridge } = require('electron')

let directoryContents = (path) => {
  let results = readdirSync(path, { withFileTypes: true })
  return results.map((entry) => ({
    name: entry.name,
    type: entry.isDirectory() ? 'directory' : 'file',
  }))
}

let currentDirectory = () => {
  return process.cwd()
}

let readData = (fileNames) => {
  let results = new Array()
  fileNames.forEach((fileName) => {
    if (!fileName.endsWith('.json')) fileName = fileName + '.json'
    let result = ''
    result = readFileSync(`${process.cwd()}/data/${fileName}`, {
      encoding: 'utf-8',
    })
    //   readFile(`${process.cwd()}/data/${fileName}`, (error, data) => {
    //     if (error) {
    //       alert('An error ocurred reading the file :' + error.message)
    //       return
    //     }
    //     results = data
    //   })
    let source =
      fileName === 'lineups.json'
        ? ''
        : fileName.slice('lineups-'.length, -1 * '.json'.length)
    JSON.parse(result).forEach((item) => {
      item['source'] = source
      results.push(item)
    })
  })
  return results
}

let readDataDirectory = () => {
  let results = readdirSync(`${process.cwd()}/data`, { withFileTypes: true })
  return results
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name)
}

contextBridge.exposeInMainWorld('electron', {
  directoryContents,
  currentDirectory,
  readData,
  readDataDirectory,
})
