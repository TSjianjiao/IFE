/**
 * @file 主程序
 * @description 
 * 因为监听事件和发布事件分散在程序各处 看起来不太方便
 * 因为有很多异步事件 很容易发生错误 bug找起来也很累
 * 一定要解除监听消息 
 */
// 餐厅初始化
const restaurant = Restaurant.getInstance({
    cash:10000,
    seats:4,
    staffList:[]
});

// 监听 ##顾客到达## 事件（餐厅
// id方便取消监听
// restaurant的id是0 staff的id从1开始自动设置
restaurant.observer.setlistener('arrive', 0, restaurantGo)

// 监听 ##更新餐馆金钱## 消息
restaurant.observer.setlistener('updateCash', 0, e => {
    restaurant.dom.updateCash(restaurant.cash = restaurant.cash + e);
    // 餐厅腾出空位
    restaurant.seats += 1;
    // 餐厅Go
    restaurantGo();
})

// 制作菜单
// 菜单结构 index：{name,cost,price,takeTime(ms)} 
const menu = Menu.getInstance([
    {
        name:'很好吃的菜',
        cost:1,
        price:2,
        takeTime:1
    },
    {
        name:'很难吃的菜',
        cost:1,
        price:3,
        takeTime:2
    },
    {
        name:'很苦的菜',
        cost:1,
        price:4,
        takeTime:3
    },
    {
        name:'很咸的菜',
        cost:1,
        price:5,
        takeTime:4
    }
])

/**
 * 增加厨师
 */
function addCook() {
    const newCook = new Cook({
        name:"cook",// name当type用 懒得加type了
        wages:1
    })
    restaurant.hire(newCook);
    const kitchen = document.getElementById('kitchen');
    newCook.dom.createrCook(kitchen);
    // 监听 ##烹饪消息##
    newCook.observer.setlistener('cooking', newCook.id, async e => {
        // 如果这个厨师是被选中的
        if(newCook.dom.cookDom === e.dom 
            && e.data) {
            const index = e.data.index; // index是几号桌 方便服务员定位
            const order = e.data.orderList;
            newCook.dom.addCookingList(order);
            for (let x in order) {
                let meal = await newCook._doneWork(order[x]);
                // 完成一项菜品 发送 ##上菜消息##
                newCook.observer.setPublish('pass', {meal, cook:newCook, index});
            }
            // 烹饪完成后发布 ##索取任务##
            newCook.dom.undo();
            newCook.observer.setPublish('getTask', newCook.dom.cookDom);
        }
    });
}

// 厨房接收 ##白板任务##
// 厨房发布 ##烹饪消息##
const kitchen = Observer.getInstance();
kitchen.setlistener('cooktask', -2, e => {
    const kitchenObj = document.getElementById('kitchen');
    // 选择一个空闲厨师 把这个厨师的dom 和点餐信息 发送出去
    const freeCook = kitchenObj.querySelector(`svg[free='']`)
    kitchen.setPublish('cooking', {dom:freeCook, data:e})
})

// 后厨白板
let toDoList = new ToDoList();
toDoList.observer.setlistener('order', -1, e => {
    const todo = document.getElementById('toDoList');
    // 加入列表
    const li = document.createElement('li');
    li.setAttribute('index', e.index);
    li.innerText = `${e.index}号桌点餐`;
    todo.appendChild(li);
    toDoList.list.push(e);
    // 检查厨房有无空闲厨师
    const kitchen = document.getElementById('kitchen');
    if(kitchen.querySelector("svg[free='']")) {
        // 发布 ##白板任务##
        const item = toDoList.list.shift();
        toDoList.observer.setPublish('cooktask', item);
        todo.removeChild(todo.querySelector(`li[index='${item.index}']`))
    }
})
// 接收 ##索取任务##
toDoList.observer.setlistener('getTask', -1, e => {
        const todo = document.getElementById('toDoList');
        // 发布 ##烹饪消息##
        if (toDoList.list.length) {
            const item = toDoList.list.shift();
            toDoList.observer.setPublish('cooking', {dom:e, data:item});
            todo.removeChild(todo.querySelector(`li[index='${item.index}']`));
        }
})


// 出菜窗口 发布 ##出菜任务##   
// 出菜窗口 监听 ##传菜消息##
const restArea = new WaiterRestArea();
restArea.observer.setlistener('pass', -3, e => {
    // 页面中不存在这个区域只是一个中转站
    // 安排一个空闲的服务员
    restArea.mealList.push(e);
    for(let x of [...document.querySelectorAll(`svg[class~='waiter']`)]) {
        if(x.hasAttribute('free')) {
            const data = restArea.mealList.pop();
            // 发送消息
            restArea.observer.setPublish('passTask', {waiter:x, data});
            break;
        }
    }
});
// 出菜窗口 发布 ##收账任务##   
// 出菜窗口 监听 ##结账消息##
restArea.observer.setlistener('payBill', -3, e => {
    for(let x of [...document.querySelectorAll(`svg[class~='waiter']`)]) {
        if(x.hasAttribute('free')) {
            // 发送消息
            restArea.observer.setPublish('accountTask', {waiter:x, seatIndex:e.index});
            break;
        }
    }
})
/**
 * 增加服务员
 */
function addWaiter() {
    const newWaiter = new Waiter({
        name:"waiter",
        wages:2
    })
    restaurant.hire(newWaiter);
    newWaiter.dom.createWaiter();
    newWaiter.dom.undo();
    // 和厨师基本上是一样的逻辑
    newWaiter.observer.setlistener('passTask', newWaiter.id, e => {
        if(e.waiter === newWaiter.dom.waiterDom) {
            const meal = e.data.meal;
            const cook = e.data.cook;
            const index = e.data.index;
            newWaiter._doneWork({
                meal,
                index,
            }, cook);
            // 发布 ##上菜完成消息##
            newWaiter.observer.setPublish('eat', {meal, index})
        }
    });
    // 监听 ##收账任务##
    newWaiter.observer.setlistener('accountTask', newWaiter.id,  e => {
        if(e.waiter === newWaiter.dom.waiterDom) {
            newWaiter.dom.byCustomer(e.seatIndex);
            newWaiter.dom.undo();
        }
    });
}

// 加入厨师
document.getElementById('addCook').addEventListener('click', addCook);
// 加入服务员
document.getElementById('addWaiter').addEventListener('click', addWaiter);
// 运转餐厅
document.getElementById('Go').addEventListener('click', startQueue);

/**
 * 开始顾客队列 （发布顾客到达事件）
 */
let customerQueue = [];
let customerQueueObj = document.getElementById('customer-queue');
function startQueue() {
    // 顾客队列
    let queueLimit = 6;
    const timerId = setInterval(()=>{
        let customerNum = Math.floor(Math.random() * 3);
        // 顾客队列
        if(customerQueue.length < queueLimit) {
            for(let i = 0; i < customerNum; i++) {
                let newCustomer = new Customer();
                customerQueue.push(newCustomer);
                // 添加图标
                newCustomer.dom.createrQueueItem(customerQueueObj);
                // 监听 ##上菜完成消息##
                newCustomer.observer.setlistener('eat', newCustomer.id, e => {
                    if (newCustomer.dom.seatIndex === e.index) {
                        const meal = e.meal;
                        // 补时间 具体原理不赘述了
                        // 因为吃是异步操作
                        let addTime;
                        meal.takeTime > 3 ? addTime = 0 : addTime = Number(3 - meal.takeTime);
                        newCustomer._eat(meal, addTime);  
                    }
                });
                // 监听 ##付账消息##
                // 发布 ##更新餐馆金钱数消息##
                // 付账消息是从 newCustomer._eat()内部发来的
                newCustomer.observer.setlistener('payBill', newCustomer.id, e => {
                    if (newCustomer.dom.emptySeat === e.seat) {
                        // 付钱金额
                        const bill = newCustomer.payBill();
                        // 成本
                        let cost = 0;
                        newCustomer.order.forEach(element => cost += element.cost);
                        // 腾出空位
                        newCustomer.dom.seatEmpty();
                        newCustomer.observer.cancelAll(newCustomer.id); // 一定要解除监听
                        newCustomer.observer.setPublish('updateCash', (bill-cost));
                    }
                });
                // 发布 ##顾客到达## 事件 (顾客
                newCustomer.observer.setPublish('arrive', customerQueue);
            }
        }
    }, 1000);
}

/**
 * 餐厅运转
 */
function restaurantGo() {
    while(restaurant.seats > 0
        && restaurant.cash > 0
        && customerQueue.length > 0
        && restaurant.staffList.length > 0) {
        console.log(customerQueue)
        let curretCustomer = customerQueue.shift();
        // 队列减一
        let child = customerQueueObj.firstElementChild;
        customerQueueObj.removeChild(child);
        // 安排座位
        let emptySeatList = curretCustomer.dom.getEmptySeat();
        curretCustomer.dom.sitDown(emptySeatList.pop());
        restaurant.seats -= 1;
        // 点菜 异步 因为懒 没有加事件发布
        _order(curretCustomer, menu);
    }
}

/**
 * 顾客点菜
 */
async function _order(curretCustomer, menu) {
    // 3s点菜
    let orderList =  await curretCustomer._order(menu);
    // 发布 ##点菜事件## (顾客
    // 把自己点的餐和座位序号发布
    curretCustomer.observer.setPublish('order', {orderList,index:curretCustomer.dom.seatIndex})
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
