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
// 菜单结构 index：{name,cost,price} 
const menu = Menu.getInstance([
    {
        name:'小黄鸭闹肚子',
        cost:1,
        price:2,
    },
    {
        name:'心痛的感觉',
        cost:1,
        price:3,
    },
    {
        name:'乱棍打死猪八戒',
        cost:1,
        price:4,
    },
    {
        name:'火辣辣的吻',
        cost:1,
        price:5,
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
// 顾客队列
let customerQueue = [];
const customer_1 = new Customer();
const customer_2 = new Customer();
const customer_3 = new Customer();
const customer_4 = new Customer();
customerQueue.push(customer_1, customer_2, customer_3, customer_4);

// 运转餐厅
document.getElementsByTagName('button')[0].addEventListener('click', ()=>opening(customerQueue))

/**
 * 餐厅运转
 * @param {array} queue 
 */
async function opening (queue) {
    // 保存队列
    let customerList = [...queue];
    // let customerList = queue;
    while (restaurant.seats > 0 
        && restaurant.cash > 0 
        && restaurant.staffList.length > 0 
        && customerList.length > 0) {
        console.log(customerList)
        // 入座
        console.log('哟！老板来了，快请坐！')
        restaurant.seats -= 1;
        let curretCustomer = customerList.shift();
        // 点菜 暂时只点一个菜
        let order = [];
        await delay(1000);
        order.push(curretCustomer.order(menu));
        let waiterFlag = waiter_1.doneWork(order);
        await delay(1000);
        console.log(`小声嘀咕：就点了一个  ${order[0].name} ?`)
        // 通知厨师做菜
        let cookFlag = false;
        if (waiterFlag) {
            console.log('>>>>烹饪中<<<<')
            await delay(2000);
            cookFlag = cook_1.doneWork(order);
        }
        // 厨师烹饪完成
        if (cookFlag) {
            console.log('福勿郝！上菜了');
            await delay(1000);
            waiterFlag = waiter_1.doneWork('');
            await delay(1000);
            console.log(`"王老板这是您点的  ${order[0].name}"`)
            console.log('>>>>上菜完成<<<<')
        }
        // 顾客享用
        let customerFlag = false;
        if (waiterFlag) {
            await delay(1000);
            console.log(`王老板："这 ${order[0].name} 真香！"`)
            await delay(1000);
            customerFlag = curretCustomer.eat()
            console.log('嗝~~~')
        }
        // 顾客吃完
        if (customerFlag) {
            restaurant.seats += 1;
        }
    }
    await delay(1000);
    console.log('>>>>没客人了<<<<');
    await delay(1000);
    console.log('>>>>打扫打扫<<<<');
    await delay(1000);
    console.log('>>>>打烊！<<<<');
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
