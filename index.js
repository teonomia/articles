const { promisify } = require('util')
const fs = require('fs')
const F = {
  rf: promisify(fs.readFile),
  rfold: promisify(fs.readdir),
  wf: promisify(fs.writeFile),
  wfold: promisify(fs.mkdir)
}

async function read (path='') {
  return F.rfold(process.cwd()+'/'+path)
  F.wf(process.cwd()+'/list/'+path+'.json', JSON.stringify(list))
}

async function write (path='', file) {
  return F.wf(process.cwd()+'/list/'+path+'.json', file)
}
async function start () {
  const authorsList = await read('authors')
  write('authors', JSON.stringify(authorsList))
  authorsList.map(async author => {
    const articles = await read(`authors/${author}/pt/`)

    write(`authors/${author}`, JSON.stringify(articles))
  })
}

start()
