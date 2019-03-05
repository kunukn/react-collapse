import gzip from 'gzip-size';

export default function sizes(options) {
  return {
    name: 'rollup-plugins/sizes-plugin',
    generateBundle(outputOptions, bundle, isWrite) {
      Object.keys(bundle).forEach(id => {
        const chunk = bundle[id];

        if (chunk && chunk.code) {
          const size = Buffer.byteLength(chunk.code);
          const gzipSize = gzip.sync(chunk.code);
          options.getSize(size, gzipSize, chunk.fileName);
        }
      });
    },
  };
}
