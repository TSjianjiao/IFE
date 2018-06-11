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
        this.dom = new restaurantDomOp();
        this.dom.updateCash(this.cash);
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
        super(name, wages); // 使用super代替call(this) // 创造了一个这个子类的this 不然使用的是父类的this
        this.dom = new WaiterDomOp()
    }                                     
    // 服务员完成工作
    async _doneWork(order, cook) {
        //如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
        if(order.length !== undefined && typeof order !== "string") {
            let position = this.dom.byCook('order', cook);
            this.dom.waiterDom.setAttribute('style', `left:${position.left}px;top:${position.top}px`);
            await delay(500);            
            return true
        }
        else {
            let position = this.dom.byCook('pass', cook);
            this.dom.waiterDom.setAttribute('style', `left:${position.left}px;top:${position.top}px`);
            cook.dom.removeState(); 
            await delay(500);
            this.dom.byCustomer(order.index);
            await delay(500);
            console.log(">>>>>进行上菜<<<<<")
            this.dom.undo();
            return order.meal
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
        this.dom = new CookDomOp()
    }
    // 厨师完成工作
    async _doneWork(menu) {
        // 完成一次工作：烹饪出菜品
        console.log('>>>>烹饪中<<<<');
        this.dom.cookDom.removeAttribute('complete');
        let currentCooking = this.dom.removeItem(menu);
        this.dom.addState(currentCooking);
        for (let i = 0; i < (Number(menu.takeTime)); i++) {
            await delay(1000);
            this.dom.updateTime();
        }
        this.dom.cookDom.setAttribute('complete','');
        return new Promise(resolve=>resolve(menu))
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
    constructor(baseTime = 3){
        this.baseTime = baseTime
        this.order
        this.dom = new CustomerDomOp()
    }
    // 点菜
    async _order(menu) {
        // 随机点菜 1~5个
        let num = Math.ceil(6 * Math.random());
        let orderList = [];
        for(let i = 0; i < num; i++) {
            const index = Math.round((Object.keys(menu).length - 1)* Math.random());
            orderList.push(menu[index])
        }
        for(let i = this.baseTime; i >= 0; i--) {
            this.dom.updateOrderState(i)
            await delay(1000);
        }
        this.order = orderList;
        // 将点的菜添加到列表
        this.dom.addOrderList(this.order);
        return new Promise((resolve, reject)=>resolve(orderList))
    }
    // 吃
    async _eat(meal, addTime = 0) {
        let time = addTime + this.baseTime;
        for (let i = time; i >= 0; i--) {
            this.dom.updateOrderList(meal, 'eat', i);
            await delay(1000);
        }
        this.dom.updateOrderList(meal, 'over');
        console.log('吃完', meal.name);
        return new Promise(resolve=>resolve(true))
    }
    // 结账
    payBill() {
        let bill = 0;
        for(x of this.order) {
            bill += x.price;
        }
        console.log("结账",bill);
        return(bill)
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
                price:item.price,
                takeTime:item.takeTime
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

/**
 * 延迟函数
 * @param {number} time 
 */
function delay(time) {
    return new Promise((resolve, reject)=>{
        setTimeout(function () {resolve()}, time);
    })
}
