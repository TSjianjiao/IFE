/**
 * 餐厅类
 */
class Restaurant {
    constructor(detail) {
        this.cash = detail.cash || 0;
        this.seats = detail.seats || 0;
        this.staffList = detail.staffList || [];
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
    constructor (name, wages) {
        this.id =  id++;
        this.name = name || '';
        this.wages = wages || 0;
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
    constructor (detail) {
        super(detail.name, detail.wages); // 使用super代替call(this) 
    }                                     // 创造了一个这个子类的this 不然使用的是父类的this
    // 服务员完成工作
    waiterWork(order) {
        //如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
        if(typeof order === 'array') {
            console.log("记录点菜")
        }
        else {
            console.log("进行上菜")
        }
        Waiter.prototype.doneWork();
    }
}

/**
 * 厨师类，继承自职员
 */
class Cook extends Staff {
    constructor(name, wages) {
        super(name, wages)
    }
    // 厨师完成工作
    cookWork(menu) {
        // 完成一次工作：烹饪出菜品
        Waiter.prototype.doneWork();
        console.log("完成烹饪")
    }
}

/**
 * 顾客类
 */
class Customer {
    constructor(){}
    // 点菜
    order() {

    }
    // 吃
    eat() {

    }
}

/**
 * 菜品类
 */
class Menu {
    constructor (item) {
        //属性：名字、烹饪成本、价格
        this.name = item.name || "";
        this.cost = item.cost || 0;
        this.price = item.price || 0;
    }
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staffList: []
});

function test1() {
    console.log('*******ES6******')
    let newCook1 = new Cook("newCook1", 10000);
    ifeRestaurant.hire(newCook1);
    let newCook2 = new Cook("newCook2", 10000);
    ifeRestaurant.hire(newCook2);
    let newCook3 = new Cook("newCook3", 10000);
    ifeRestaurant.hire(newCook3);
    console.log(ifeRestaurant.staffList);
    ifeRestaurant.fire(newCook2);
    console.log('*******开除第二个厨师******')
    console.log(ifeRestaurant.staffList);
    console.log('*******ES6******')
}
test1();
