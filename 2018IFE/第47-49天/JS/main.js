/**
 * @file 主程序
 */

// 判断座位<--------------+
// 顾客入座               |
// 顾客点菜-------+       |
//                |       |
// 服务员记录点菜<-+       |
// 通知厨师               |
// 做菜                   |
// 完成做菜-------+       |  
//               |       |        
// 通知服务员<----+       |       
// 上菜                   |                  
// 顾客吃                 |                
// 顾客吃完               |
// 顾客队列pop------------+

// 开业餐厅
const restaurant = Restaurant.getInstance({
    cash:10000,
    seats:1,
    staffList:[]
});
// 制作菜单
// 菜单结构 index：{name,cost,price,takeTime(ms)} 
const menu = Menu.getInstance([
    {
        name:'小黄鸭闹肚子',
        cost:1,
        price:2,
        takeTime:1
    },
    {
        name:'心痛的感觉',
        cost:1,
        price:3,
        takeTime:2
    },
    {
        name:'乱棍打死猪八戒',
        cost:1,
        price:4,
        takeTime:3
    },
    {
        name:'火辣辣的吻',
        cost:1,
        price:5,
        takeTime:4
    }
])
// 招聘
const cook_1 = Cook.getInstance({
    name:"范真香",
    wages:1
})

const waiter_1 = Waiter.getInstance({
    name:"福勿郝",
    wages:2
})
restaurant.hire(waiter_1);
restaurant.hire(cook_1);
let kitchenObj = document.getElementsByClassName('kitchen')[0];
// 加入厨师
// CookDomOp.createrCook(1, kitchenObj);
cook_1.dom.createrCook(kitchenObj)
// 顾客队列
let customerQueue = [];
const customer_1 = new Customer();
const customer_2 = new Customer();
const customer_3 = new Customer();
const customer_4 = new Customer();
customerQueue.push(customer_1, customer_2, customer_3, customer_4);
// 添加图标
let customerQueueObj = document.getElementById('customer-queue');
for (x of customerQueue) {
    x.dom.createrQueueItem(customerQueueObj);
}
// 运转餐厅
document.getElementsByTagName('button')[0].addEventListener('click', ()=>opening(customerQueue));
/**
 * 餐厅运转
 * @param {array} queue 
 */
async function opening (queue) {
    // 保存队列
    let customerList = [...queue];
    // 记录客人吃完了几样菜
    let customerDone = [];
    waiter_1.dom.createWaiter();
    while (restaurant.seats > 0 
        && restaurant.cash > 0 
        && restaurant.staffList.length > 0 
        && customerList.length > 0) {
        console.log(customerList)
        // 入座
        console.log('哟！老板来了，快请坐！')
        restaurant.seats -= 1;
        let curretCustomer = customerList.shift();
        // 队列减一
        let child = customerQueueObj.lastElementChild;
        customerQueueObj.removeChild(child);
        // 安排座位
        curretCustomer.dom.sitDown()
        waiter_1.dom.byCustomer(curretCustomer.dom.seatIndex)
        // 点菜 耗时3s
        console.log('老板今天吃点啥')
        let order = [];
        // 给客人点的菜 加上座位index 不然不知道是谁点的
        order = await curretCustomer._order(menu);
        // 成本
        let cost = 0;
        order.forEach(element => cost += element.cost);
        console.log(order)
        console.log('老板，请稍等')
        // 通知厨师做菜
        if (waiter_1._doneWork(order, cook_1)) {
            let promiseList = [];
            let mealList = [];
            let timerId;
            cook_1.dom.addCookingList(order);
            for (let x in order) {
                // meal和order[x]一样的
                let meal = await cook_1._doneWork(order[x]);
                mealList.push(meal);
                // 通知上菜
                await waiter_1._doneWork({
                    meal,
                    index:curretCustomer.dom.seatIndex
                }, cook_1);
                waiter_1.dom.undo();
                // 补时间 具体原理不赘述了
                meal.takeTime > 3 ? addTime=0 : addTime=Number(3 - meal.takeTime);
                // 异步操作放入数组
                await delay(300)
                if (x === '0') promiseList.push(curretCustomer._eat(meal))
                else promiseList.push(curretCustomer._eat(meal, addTime))
            }
            // 等待所有吃饭异步操作完成
            await Promise.all(promiseList);
            const bill = curretCustomer.payBill();
            restaurant.dom.updateCash(restaurant.cash = restaurant.cash + (bill - cost))
            // 腾出空位
            restaurant.seats += 1;
            curretCustomer.dom.seatEmpty();
        }
    }
    console.log('>>>>没客人了<<<<');
    console.log('>>>>打扫打扫<<<<');
    console.log('>>>>打烊!<<<<');
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
