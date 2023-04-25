/**
 * 原型链继承
 * 缺点1：原型中包含的引用类型属性将被所有实例共享；
 * 缺点2：子类在实例化的时候不能给父类构造函数传参；
 */
function byPrototype() {
    function Parent() {
        this.colors = ['black']
    }
    function Child(name) {
        this.name = name
    }

    // constructor 属性表示原型对象与构造函数之间的关联关系，修改原型时记得同时修改
    Child.prototype = new Parent()
    Child.prototype.constructor = Child

    let child1 = new Child('xx')
    console.log(child1)
    console.log(child1.name) // xx

    child1.colors.push('white')
    let child2 = new Child('yy')
    console.log(child2.colors) // ['black', 'white']
}
// byPrototype()


/**
 * 构造函数继承
 * 1. 避免了引用类型的属性被所有实例共享；
 * 2. 可以向 Parent 传参
 * 缺点：父类方法只能在构造函数中定义，每次创建实例都会创建一遍方法
 */
function byConstructor() {
    function Parent(name) {
        this.name = name
        this.colors = ['black']
        this.go = function() {
            console.log('go!', this.name)
        }
    }
    function Child(name) {
        Parent.call(this, name)
    }

    let child1 = new Child('xx')
    console.log(child1)
    child1.colors.push('white')
    console.log(child1.name) // xx

    let child2 = new Child('yy')
    console.log(child2.name) // yy
    console.log(child2.colors) // ['black']
}
// byConstructor()

/**
 * 组合继承
 * 融合了原型链继承和构造函数继承的优点
 * 缺点：父构造函数被调用了两次
 */
function compose() {
    function Parent(name) {
        console.log('[Parent] constructor') // 打印了两次
        this.name = name
        this.colors = ['black']
    }
    Parent.prototype.go = function() {
        console.log('go!', this.name)
    }

    function Child(name, age) {
        Parent.call(this, name)
        this.age = age
    }
    Child.prototype = new Parent()
    Child.prototype.constructor = Child

    let child1 = new Child('tom', 18)
    child1.colors.push('white')
    console.log(child1.colors)
    child1.go()

    let child2 = new Child('jack', 20)
    console.log(child2.colors)
    console.log(child2.age)
}
// compose()

/**
 * 寄生组合式继承
 */
function parasiticCompostion() {
    function Parent(name) {
        console.log('[Parent] constructor')
        this.name = name
        this.colors = ['black']
    }
    Parent.prototype.go = function() {
        console.log('go!', this.name)
    }

    function Child(name, age) {
        Parent.call(this, name)
        this.age = age
    }

    // 关键一步：构造新对象指向父类原型
    Child.prototype = Object.create(Parent.prototype)
    Child.prototype.constructor = Child

    let child = new Child('justorez', 18)
    child.go()
    console.log(child)
    console.log(child instanceof Child)
}
// parasiticCompostion()


// 将寄生组合式继承封装一下
function objectCreate(o) {
    function F() {}
    F.prototype = o
    return new F()
}
function prototype(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype) // 和 objectCreate() 功能相同
    Child.prototype.constructor = Child
}


