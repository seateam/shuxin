const stylus = require('stylus')
const fs = require('fs')
const Gaze = require('gaze')
const gaze = new Gaze.Gaze('../app/**/*.stylus')
console.log('>>>', '开始监听 ../app/**/*.stylus')

// 压缩 CSS
const compress = function(v_old) {
  let v_new = ''
  // 除去首尾空格
  v_new = v_old.replace(/\/\*((.|\n|\t)*?)\*\//g, '')
  // 去除样式间空格
  v_new = v_new.replace(/(\s)*{\s*/g, '{').replace(/(\s)*}\s*/g, '}')
  // 去除样式名称后面空格
  v_new = v_new.replace(/(\s)*;\s*/g, ';')
  // 去除换行符
  v_new = v_new.replace(/:(\s)*/g, ':')
  // 去除末尾分号
  v_new = v_new.replace(/(\n|\t)+/g, '')
  // IE6下css-letter留空的问题
  v_new = v_new.replace(/;}/g, '}')
  if (/first\-letter{/g.test(v_new)) {
    v_new = v_new.replace(/first\-letter{/g, 'first-letter {')
  }
  return v_new
}

// Files have all started watching
gaze.on('ready', watcher => {})

// A file has been added/changed/deleted has occurred
gaze.on('all', (name, filepath) => {
  if (name === 'changed' || name === 'added') {
    const str = fs.readFileSync(filepath, 'utf8')
    stylus(str)
      .render((err, css) => {
        if (err) {
          console.log('>>>', err.message)
        } else {
          let path = filepath.replace('.stylus', '.wxss')
          css = css.replace('.css', '.wxss')
          fs.writeFileSync(path, compress(css), 'utf8')
          console.log(path.split('\\').slice(-1)[0], Date.now())
        }
      })
  }
})