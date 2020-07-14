function Map(row, col, width, height) {
	this.arr = [];
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	// 创建渲染页面的盒子
	this.dom = document.createElement('div');
}
// 添加渲染页面的方法
Map.prototype.fill = function() {
	// 循化创建、添加行元素
	for(var j = 0; j < this.row; j++) {
		var row_dom = document.createElement('div');
		// 给每行添加一个类
		row_dom.className = 'row_box';
		// 创建一个行数组
		var row_arr = [];
		// 循环创建、添加列元素
		for(var i = 0; i < this.col; i++) {
			var col_dom = document.createElement('span');
			// 给每个小格添加类
			col_dom.className = 'col_box';
			row_dom.appendChild(col_dom);
			// 追加到行数组中
			row_arr.push(col_dom);
		}
		this.dom.appendChild(row_dom);
		// 将行数组放入到数组中
		this.arr.push(row_arr);
	}
	// 给盒子添加类
	this.dom.className = 'box';
	// 上树 
	document.body.appendChild(this.dom);
}
// 清屏
Map.prototype.clear = function() {
	for(var i = 0; i < this.arr.length; i++) {
		for(var j = 0; j < this.arr[i].length; j++) {
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}