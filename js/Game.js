function Game(map, food, snake, block) {
	this.map = map;
	this.food = food;
	this.snake = snake;
	this.block = block;
	this.timer = null;
	this.flag = null;
	// 定义初始化方法
	this.init();
}
// 初始化
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}
// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}
// 渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	// this.map.arr[row][col].style.backgroundColor = "red";
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}
// 渲染蛇
Game.prototype.renderSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	// 循环遍历蛇的身体
	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		// 提取变量简化代码书写
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// this.map.arr[row][col].style.backgroundColor = "green";
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}
	// 获取蛇的尾部
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
	for(var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}
// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
	// 缓存this
	var that = this;
	this.timer = setInterval(function(){
		// 移动
		that.snake.move();
		// 检查是否撞墙
		that.checkBorder();
		// 检查是否吃到自己
		that.checkSnake();
		// 检查是否吃到食物
		that.checkFood();
		// 检查是否碰到障碍物
		that.checkBlock();
		// 判断游戏是否进行
		if(that.flag) {
			// 清屏
			that.map.clear();
			// 渲染食物
			that.renderFood();
			// 渲染蛇
			that.renderSnake();
			// 渲染障碍物
			that.renderBlock();
		}
	}, 200)
}
// 游戏结束
Game.prototype.gameOver = function() {
	this.flag = false;
	clearInterval(this.timer);
}
// 绑定移动事件
Game.prototype.bindEvent = function() {
	var that = this;
	document.onkeydown = function(e) {
		var codeId = e.keyCode;
		if(codeId === 65 || codeId === 68 || codeId === 83 || codeId === 87 ) {
			// 调用转向方法
			console.log(codeId);
			that.snake.change(codeId);
		}
	}
}
// 检查是否出界
Game.prototype.checkBorder = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		console.log("你撞墙了！");
		this.gameOver();
	}
}
// 检查是否吃到食物
Game.prototype.checkFood = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	var food = this.food;
	if(head.row === food.row && head.col === food.col) {
		console.log("吃到食物了！");
		this.snake.growUp();
		// 重置食物
		this.resetFood();
	}
}
// 重置食物
Game.prototype.resetFood = function() {
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	// 判断食物是否与蛇重合
	for(var i = 0; i < this.snake.arr.length; i++) {
		if(row === this.snake.arr[i].row && col === this.snake.arr[i].col) {
			console.log("食物与蛇重合！");
			this.resetFood();
			return;
		}
	}
	// 判断食物是否与障碍物重合
	for(var i = 0; i < this.block.arr.length; i++) {
		if(row === this.block.arr[i].row && col === this.block.arr[i].col) {
			console.log("食物与障碍物重合！");
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col);
}
// 吃到自己
Game.prototype.checkSnake = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	for(var i = 0; i < this.snake.arr.length - 1; i++) {
		if(head.row === this.snake.arr[i].row && head.col === this.snake.arr[i].col) {
			console.log("吃到自己啦！");
			this.gameOver();
		}
	}
}
// 检查是否碰到障碍物
Game.prototype.checkBlock = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	for(var i = 0; i < this.block.arr.length; i++) {
		if(head.row === this.block.arr[i].row && head.col === this.block.arr[i].col) {
			console.log("碰到障碍物啦！");
			this.gameOver();
		}
	}
}