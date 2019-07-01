const Sea = require('../../packages/bigsea.js')
const app = getApp()
Component({
  options: {
    addGlobalClass: false,
  },
  properties: {
    theme: {
      type: String,
    },
  },
  observers: {},
  data: {
    imgs: [
      'http://statics01.qingmang.mobi/FuY-Srn-SOeREBBxzcdQ1QL0LEHx',
      'http://statics01.qingmang.mobi/FjuLuRCxNtV06IA7yCS6MkmilPJU',
      'http://qiniuimg.qingmang.mobi/image/orion/3e0d6732a1f7bc273f2f4b6c7ceea3b4_945_628.jpeg?imageView2/2/w/750',
      'http://qiniuimg.qingmang.mobi/image/orion/06a7b91f1103407fdb0bfeb7994d37d1_1080_703.jpeg?imageView2/2/w/750',
      'http://qiniuimg.qingmang.mobi/image/orion/aa08370f4fcf79e7ca097946d36eec77_900_500.jpeg?imageView2/2/w/750',
      'http://qiniuimg.qingmang.mobi/image/orion/105f710672bc2d2c055008a7a1c779f7_1024_768.jpeg?imageView2/2/w/750',
      'http://qiniuimg.qingmang.mobi/image/orion/6c2e0a49f0912224d0047dbbcb5752b9_640_396.jpeg',
    ],
    users: [
      {
        name: '李小兔',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9EWUFJT2dxODNlcEd4Y29SaWI5aWE3SGdXNWN3akdEbEZrdDhUVExxRmxKaHJtMm5oTmJaQUpkdUMzMlJpYjV1M29RTHBHWlEzSXMyQ09weFh3aWNjUmdNNEEvMTMy',
      },
      {
        name: 'LEMONed',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cCUzQS8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvRFlBSU9ncTgzZXBSNXI2eG53MWJXVm1rNno4NUNMRmpjMUhmOUV3Y1NhVkFQcWliZ3ljZmFYYnF2ZW90T2RCVVhNeWtkcGFjY0hOWGZtV1lOcG92OHVnLzEzMg==',
      },
      {
        name: '范怀宇',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9EWUFJT2dxODNlcWVPWTZDQUdRb1l3bFlUZklZNExCdFh6cHFDcmljNEIzMkU2bUw0dE15WE9zdWlidWlidmV0SHRkQWljYXBQMUR1M1BNY09BWnZVRVZHSFEvMTMy',
      },
      {
        name: '云天团',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9QaWFqeFNxQlJhRUxyY2lhOUQ1NHJmQUIycXphRFlqb1ZJRXlpY2ljczRUdHFGcXJoNXgwaWN2NlA4R090OWxKazZpYmdxNXA1UmVNUlU2RzR5VHNZNlVQM0h1dy8xMzI=',
      },
      {
        name: '大海',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9QaWFqeFNxQlJhRUlJN2EwY2ZIYVpmTDNiQ2pYbzF5WDFURzNSaWMxU3ZEOUdpY3VYR2ljemN3bk9ham9IR2plZGJ3bDlKRHBhQlFhTkpnUEIwaFFkcUJiOFEvMTMy',
      },
      {
        name: 'chenyunci',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9RMGo0VHdHVGZUSlBoTkhZeUJMNWt0U09KUjBWVEMzUHdTVU1QYm5kdVZrdE5vUjNHcWMwSlJZdldUNXpHaWFuQVZIZ3REYTFMRWZGclBkZnA3M2NvNkEvMTMy',
      },
    ],
  },
  attached() {},
  methods: {
    bindBack() {
      Sea.back()
    },
  },
})
