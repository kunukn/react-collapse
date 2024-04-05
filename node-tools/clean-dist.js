import fs from 'fs'

function removeFolderContents(dir) {
  fs.rmSync(dir, { recursive: true, force: true })
}

removeFolderContents('dist')
