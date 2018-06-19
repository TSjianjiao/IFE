/**
 * @file 主文件
 */

 // 返回filed类
const createField = FootballField.getFactory('field');
// 容器大小单位是像素  球场大小单位是米
let filed = new createField({
    fieldContainerHeight:600,
    fieldContainerWidth:800,
    filedWidth: 120,
    filedHeight: 90
})
 // 返回player类
const createPlayer = FootballField.getFactory('player');
let player_1 = new createPlayer(filed, {
    x:0,
    y:45
});
let player_2 = new createPlayer(filed, {
    x:0,
    y:40
});
let player_3 = new createPlayer(filed, {
    x:0,
    y:35
});
let player_4 = new createPlayer(filed, {
    x:0,
    y:30
});
document.getElementById('go').addEventListener('click', ()=>{
    player_1.run({to_x: 120, to_y:45});
    player_2.run({to_x: 120, to_y:40});
    player_3.run({to_x: 120, to_y:35});
    player_4.run({to_x: 120, to_y:30});
});
