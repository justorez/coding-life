const fakeNew = require('../fake-new')

describe('new 操作符模拟实现', () => {
    test('fakeNew 基本使用', () => {
        let Person = function(name) {
            this.name = name
            this.hi = function() {
                return `Hi!${this.name}`
            }
        }
        Person.prototype.age = 23
        Person.prototype.say = function() {
            return `Say,${this.age}`
        }
        Person.prototype.test = () => {
            return `Test-${this.age}`
        }
    
        let p = fakeNew(Person, 'leo')
        expect(p.name).toBe('leo')
        expect(p.age).toBe(23)
        expect(p.hi()).toBe('Hi!leo')
        expect(p.say()).toBe('Say,23')
        expect(p.test()).toBe('Test-undefined')
    })
})
