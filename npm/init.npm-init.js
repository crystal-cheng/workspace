const desc = prompt('description?', 'h&c')
const bar = prompt('Dove?', '')
const count = prompt('1314?', 'yes')

module.exports = {
  key: 'value',
  foo: {
    bar: bar,
    count: count
  },
  name: prompt('name?', process.cwd().split('/').pop()),
  version: prompt('version?', '0.1.0'),
  description: desc,
  main: 'index.js',
}
