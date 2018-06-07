/**
 * @file 餐厅对象
 */

/**
 * 餐厅类
 */
 class Restaurant {
    constructor({cash = 0, seats = 0, staffList = []} = {}) {
        this.cash = cash;
        this.seats = seats;
        this.staffList =staffList;
    }
    // 单例接口
    static getInstance(param) {
        if(!this.instance) {
            this.instance = new Restaurant(param);
        }
        return this.instance;
    }
    // 招聘
    hire(newStaff) {
        this.staffList.push(newStaff);
    }
    // 解雇
    fire(staff) {
        this.staffList = this.staffList.filter((item)=>{
            return item.id !== staff.id
        })
    }
}
/**
 * 职员类
 */
let id = 1;//id暂时这样
 class Staff {
    constructor ({name = '', wages = 0} = {}) {
        this.id =  id++;
        this.name = name;
        this.wages = wages;
    }
    // 单例接口
    static getInstance(param) {
        if(!this.instance) {
            this.instance = new Staff(param);
        }
        return this.instance;
    }
    // 完成工作
    doneWork() {
        console.log("staff完成工作")
    }
}
/**
 * 服务员类，继承自职员
 */
 class Waiter extends Staff {
    constructor ({name = '', wages = 0} = {}) {
        super(name, wages); // 使用super代替call(this) 
    }                                     // 创造了一个这个子类的this 不然使用的是父类的this
    // 服务员完成工作
    doneWork(order) {
        //如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
        if(order.length !== undefined && typeof order !== "string") {
            console.log(">>>>>记录点菜<<<<<")
            return true
        }
        else {
            console.log(">>>>>进行上菜<<<<<")
            return true
        }
    }
    // 单例接口
    static getInstance(param) {
        if(!this.instance) {
            this.instance = new Waiter(param);
        }
        return this.instance;
    }
}

/**
 * 厨师类，继承自职员
 */
 class Cook extends Staff {
    constructor({name = '', wages = 0} = {}) {
        super(name, wages)
    }
    // 厨师完成工作
    doneWork(menu) {
        // 完成一次工作：烹饪出菜品
        console.log(">>>>>完成烹饪<<<<<")
        return true
    }
    // 单例接口
    static getInstance(param) {
        if(!this.instance) {
            this.instance = new Cook(param);
        }
        return this.instance;
    }
}
/**
 * 顾客类
 */
 class Customer {
    constructor(){}
    // 点菜
    order(menu) {
        // 随便点一道菜
        const index = Math.round((Object.keys(menu).length - 1)* Math.random());
        return menu[index]
    }
    // 吃
    eat() {
        console.log('>>>>吃完了<<<<')
        return true
    }
}

/**
 * 菜品类
 * @param {array} list
 */
 class Menu {
    constructor (list) {
        //一次输入多个菜品
        list.forEach((item, index)=>{
            this[index] = {
                name:item.name,
                cost:item.cost,
                price:item.price
            };
        })
    }

    // 单例接口
    static getInstance(param) {
        if(!this.instance) {
            this.instance = new Menu(param);
        }
        return this.instance;
    }
}
 