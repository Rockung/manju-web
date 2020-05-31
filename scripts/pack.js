const fs = require('fs');
const path = require('path');
const readdirp = require('readdirp');
const archiver = require('archiver');
const pkg = require('../package.json');

let files = [];

readdirp(path.resolve(__dirname, '../public'))
  .on('data', (entry) => {
    files.push({
      path: entry.path,
      fullPath: entry.fullPath,
    });
  })
  .on('warn', error => console.error('non-fatal error', error))
  .on('error', error => console.error('fatal error', error))
  .on('end', () => {
    console.log('listing files: done')
    createZipFile(files)
  });


function createZipFile(files) {
  let outPath = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }

  let output = fs.createWriteStream(path.resolve(outPath, `${pkg.name}-start-${pkg.version}.zip`));
  let archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  for (let file of files) {
    archive.append(fs.createReadStream(file.fullPath), {name: file.path});
  }

  archive.finalize();
}
