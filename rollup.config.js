import json from '@rollup/plugin-json'

export default {
  input: 'src/web/update-dom.js',
  output: { file: 'public/update-dom.js', format: 'iife' },
  plugins: [json()]
}
