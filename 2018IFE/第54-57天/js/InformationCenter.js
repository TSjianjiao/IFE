/**
 * 观察者类
 */
class Observer {
    constructor() {
        // eventList结构{[{}]}
        // {   id1:[{事件1},
        //             {事件2},
        //                 ...],
        //     id2:[{事件1},
        //             {事件2},
        //                 {事件3}
        //                     ...]
        // }
        this.eventList = {}; 
    }
    // 只能单例模式 不然这里的eventList什么的不能共享 也就不能发挥作用了
    static getInstance() {
        if(!this.instance) {
            this.instance = new Observer();
        }
        return this.instance;
    }
    // 注册监听
    setlistener(type, id, fn) {
        // 如果没注册过 就创建一个
        if (!this.eventList[`${id}`]) {
            this.eventList[`${id}`] = [];
        }
        this.eventList[`${id}`].push({
            type,
            fn,
        })
        return id
    }
    // 发布事件
    setPublish(type, event) {
        for (let x in this.eventList) {
            this.eventList[x].forEach(item=>{
                if(item.type === type) {
                    item.fn(event)
                }
            })
        }
    }
    // 取消监听
    cancelListen(type, id) {
        this.eventList[`${id}`].forEach((item, index)=>{
            if(item.type === type) {
                this.eventList[`${id}`].splice(index, 1)
            }
        })
    }
    // 取消全部
    cancelAll(id) {
        delete this.eventList[`${id}`]
    }
}
