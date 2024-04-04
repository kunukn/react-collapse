import { copyFile } from 'copy-file'

await copyFile('types/index.d.ts', 'dist/react-collapse.d.ts')
console.log('** File copied')
