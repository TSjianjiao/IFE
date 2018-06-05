/**
 * 餐厅类
 */
function Restaurant(detail) {
    this.cash = detail.cash || 0;
    this.seats = detail.seats || 0;
    this.staffList = detail.staffList || [];
}
// 招聘
Restaurant.prototype.hire = function (newStaff) {
    this.staffList.push(newStaff);
}
// 解雇
Restaurant.prototype.fire = function (staff) {
    this.staffList = this.staffList.filter((item)=>{
        return item.id !== staff.id
    })
}
let id = 1;//id暂时这样
/**
 * 职员类
 */
function Staff(name, wages) {
    this.id =  id++;
    this.name = name || '';
    this.wages = wages || 0;
}
// 完成一次工作
Staff.prototype.doneWork = function () {
        console.log("staff完成工作")
}

/**
 * 继承函数
 * @param {Object} subType 
 * @param {Object} superType 
 */
function extend(subType, superType) {
    function F(){};
    F.prototype = superType.prototype;  // 现在这个F类完全指向了超类// 等于超类				
    let prototype = new F;              
    prototype.constructor = subType;// 将这个F类的构造属性 指向子类
    subType.prototype = prototype;// 再把超类 给子类
    // 优点就是只需要调用一次就继承 不会像写在构造函数里面一样 new一个继承一次
}

/**
 * 服务员类，继承自职员
 */
function Waiter(detail) {
    Staff.call(this, detail.name, detail.wages);
}
// 继承职员的方法
extend(Waiter, Staff);
// 服务员的完成工作
Waiter.prototype.waiterWork = function (order) {
    //如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
    if(typeof order === 'array') {
        console.log("记录点菜")
    }
    else {
        console.log("进行上菜")
    }
    Waiter.prototype.doneWork();
}

/**
 * 厨师类，继承自职员
 */
function Cook(name, wages) {
    Staff.call(this, name, wages);
}
// 继承职员的方法
extend(Cook, Staff);
// 厨师的完成工作
Cook.prototype.cookWork = function (menu) {
    // 完成一次工作：烹饪出菜品
    Waiter.prototype.doneWork();
    console.log("完成烹饪")
}

/**
 * 顾客类
 */
function Customer() {

}
customer.prototype.order = function (order) {
    console.log("点菜")
}
customer.prototype.eat = function () {
    console.log("吃完")
}

/**
 * 菜品类
 */
function Menu(item) {
    //属性：名字、烹饪成本、价格
    this.name = item.name || "";
    this.cost = item.cost || 0;
    this.price = item.price || 0;
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staffList: []
});
function test2() {
    console.log('*******ES5******')
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
    console.log('*******ES5******')
}
test2();