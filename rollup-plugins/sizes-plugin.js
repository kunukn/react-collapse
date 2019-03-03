import gzip from 'gzip-size';

export default function sizes(options) {
  return {
    name: 'rollup-plugins/sizes-plugin',
    ongenerate(bundle, obj) {
      const size = Buffer.byteLength(obj.code);
      const gzipSize = gzip.sync(obj.code);

      options.getSize(size, gzipSize);
    },
  };
}
