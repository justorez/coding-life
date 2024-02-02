const toArray = require('lodash/toArray')

function splitEmoji(text) {
    const segmenter = new Intl.Segmenter('en', {
        granularity: 'grapheme' // 默认值
    })
    console.log(segmenter.segment(text))
    return Array.from(segmenter.segment(text), (s) => s.segment)
}

const emojiText = '表情文字👉🤣。'

console.log(emojiText.split(''))
console.log(splitEmoji(emojiText))

// 实现原理是对 Unicode 字符正则匹配
console.log(toArray(emojiText))
