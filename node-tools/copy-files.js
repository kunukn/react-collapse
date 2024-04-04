import { copyFile } from 'copy-file'

await copyFile('types/index.d.ts', 'dist/index.d.ts')
console.log('** File copied')
