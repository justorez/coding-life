const _ = require('../template')

test('lodash.template', () => {
    const tpl = `{{title}}! 我是{{ user['name'] }}，年龄{{user.age}}，性别{{user.sex[0]}}.`
    const data = {
        title: 'Hello',
        user: {
            name: '小明',
            age: 12,
            sex: ['♂', '♀']
        }
    }

    const compiled = _.template(tpl)
    const result = compiled(data)
    expect(result).toEqual('Hello! 我是小明，年龄12，性别♂.')
})
