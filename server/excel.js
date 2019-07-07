const log = console.log.bind(console, '>>>')
const xlsx = require('node-xlsx')
const axios = require('axios')
const Qs = require('qs')

// 读数据
const excel = xlsx.parse('./测试数据.xlsx')
// 洗数据
const who = function(name) {
  const arr = []
  for (const e of excel) {
    console.log('>>>', e.name)
    if (openid && name === e.name) {
      for (const e2 of e.data.slice(1)) {
        let [content, location, time_stamp, location_text] = e2
        if (content && location && time_stamp && location_text) {
          arr.push(e2)
        }
      }
    }
  }
  return arr
}

// 注意 这里会写入数据
const openidDict = {
  祖哥: 'o6iD25VhzkWx-uk2xDszuyD3yhiQ',
  A龟: 'o6iD25X_2wwl5CnLnoHsmLYPHJ3s',
  B海: 'o6iD25b9G_ORHJiGWm4uhnjGafkc',
  C韩: 'o6iD25fqF5FKDQ--9bMJP9zXs3Y4',
  D大海小号: 'o6iD25ZN-qlcbUMBicYO1EN0tKbA',
}
const name = '祖哥'
const openid = openidDict[name]
// 生成 url
const request = []
for (const e of who(name)) {
  let [content, location, time_stamp, location_text] = e
  let data = {
    content: content,
    location: location,
    mark_color: String(parseInt(Math.random() * (6 - 0) + 0)),
    time_stamp: String(time_stamp),
    location_text: location_text,
    public: 'true',
    openid: openid,
  }
  let url = 'https://api.echo1999.com/v1/card.add?' + Qs.stringify(data)
  request.push(url)
}
// 递龟请求
const cardAdd = function(url) {
  axios(url).then((res) => {
    if (res.data.ok) {
      log(name, '写入成功')
    } else {
      log(name, '写入失败')
    }
    // 取出
    let url = request.splice(0, 1)[0]
    if (url) {
      setTimeout(() => {
        cardAdd(url)
      }, 5000)
    }
  })
}
const url = request.splice(0, 1)[0]
cardAdd(url)

// 查询
// axios('https://api.echo1999.com/v1/card.get?openid=' + openid).then((res) => {
//   for (const e of res.data.data) {
//   }
// })
