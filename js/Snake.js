function Snake(pic_obj) {
	// 数组 存放的是蛇的每一节身体
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		{row: 4, col: 7},
		{row: 4, col: 8}
	];
	// 控制方向 left 65 top 87 right 68 down 83
	this.direction = 68;
	// 节流锁
	this.lock = true;
	// 定义蛇的头部图片
	this.head_pic = pic_obj.head_pic;
	// 定义蛇的身体图片
	this.body_pic = pic_obj.body_pic;
	// 定义蛇的尾部图片
	this.tail_pic = pic_obj.tail_pic;
	// 定义头部索引
	this.head_idx = 2;
	// 定义尾部索引
	this.tail_idx = 0;
}
// 蛇的移动方法
Snake.prototype.move = function() {
	// 创建新的头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	// 判断移动方向
	if(this.direction === 65) {
		// 向左移动，行不变，列减一
		newHead.col--;
	} else if (this.direction === 87) {
		//向上移动，列不变，行减一
		newHead.row--;
	}else if (this.direction === 68) {
		//向右移动，行不变，列加一
		newHead.col++;
	}else if (this.direction === 83) {
		//向下移动，列不变，行加一
		newHead.row++;
	}
	// 添加头部
	this.arr.push(newHead);
	// 删除尾部
	this.arr.shift();
	// 开锁
	this.lock = true;
	// 在move的时候改变尾部图片
	// 获取尾部
	var tail = this.arr[0];
	// 获取屁股
	var beforeTail = this.arr[1];
	// 判断尾巴方向
	if(tail.row === beforeTail.row) {
		// 尾巴、屁股在同一行，尾巴大向左，尾巴小向右
		this.tail_idx = tail.col > beforeTail.col ? 2 : 0;
	} else {
		// 尾巴、屁股在同一列，尾巴大向上，尾巴小向下
		this.tail_idx = tail.row > beforeTail.row ? 3 : 1;
	}
}
// 蛇的转向方法
Snake.prototype.change = function(direction) {
	// 上锁
	if(!this.lock) {
		return;
	}
	this.lock = false;
	// 判断是否逆向或者同向
	var key = Math.abs(direction - this.direction);
	if(key < 10) {
		return;
	} else {
		this.direction = direction;
	}
	// 在change的时候改变头部图片
	if (direction === 65) {
		this.head_idx = 0;
	} else if (direction === 87) {
		this.head_idx = 1;
	} else if (direction === 68) {
		this.head_idx = 2;
	} else if (direction === 83) {
		this.head_idx = 3;
	}
}
// 蛇吃食物成长的方法
Snake.prototype.growUp = function() {
	// 获取尾部
	var tail = this.arr[0];
	// 添加到头部
	this.arr.unshift(tail);
}