//const
var DOT_NUM = 19;
var MAINCANVAS_WIDTH = 600;
var MAINCANVAS_HEIGHT = 600;
var PREVIEWCANVAS_WIDTH = 500;
var PREVIEWCANVAS_HEIGHT = 100;
var LINE_LENGTH = 110;
var DOT_RADIUS = LINE_LENGTH/8;
var PREVIEW_LINE_LENGTH = 10;
var PREVIEW_DOT_RADIUS = PREVIEW_LINE_LENGTH/8;
//var INIT_COLOR = '#ddd';
var WHITE = '#fff';
var KIDS_GREEN = '#9c3';
var MIRAI_ORANGE = '#f90';
var BACKGROUND_COLOR = WHITE;
var DRAW_COLOR = KIDS_GREEN;


Vector2 = function(x, y) {
	this.x = x;
	this.y = y;
};

function getDotPos(num, interval) {
	var pos = new Vector2(0,0);
	//var angle = [-90, -30, 30, 90, 150, 210];
	if(num==0) {
		pos.x=0;
		pos.y=0;
	} else if(num>0 && num<7) {
		pos.x = Math.cos(((60*(num-1))-90) * Math.PI / 180) * interval;
		pos.y = Math.sin(((60*(num-1))-90) * Math.PI / 180) * interval;
	} else if(num>6) {
		if(num%2==1) {
			pos.x = Math.cos(((60*(num-7)/2)-90) * Math.PI / 180) * interval;
			pos.y = Math.sin(((60*(num-7)/2)-90) * Math.PI / 180) * interval;
			pos.x += Math.cos(((60*(num-7)/2)-90) * Math.PI / 180) * interval;
			pos.y += Math.sin(((60*(num-7)/2)-90) * Math.PI / 180) * interval;
		} else if(num%2==0) {
			pos.x = Math.cos(((60*(num-8)/2)-90) * Math.PI / 180) * interval;
			pos.y = Math.sin(((60*(num-8)/2)-90) * Math.PI / 180) * interval;
			pos.x += Math.cos(((60*(num-6)/2)-90) * Math.PI / 180) * interval;
			pos.y += Math.sin(((60*(num-6)/2)-90) * Math.PI / 180) * interval;
		}

	}
	return pos;
}

View = function(canvasName, width, height, isGetMove) {
	this.width = width;
	this.height = height;
	
	this.mousePos = new Vector2(0, 0);
	this.isMouseOnCanvas = false;
	this.isMouseMove = false;
	this.canvas = document.getElementById(canvasName);
	if (this.canvas && this.canvas.getContext){
		this.ctx = this.canvas.getContext('2d');
		this.canvas.addEventListener('mouseover', this.onMouseOver.bind(this), false);
		this.canvas.addEventListener('mouseout', this.onMouseOut.bind(this), false);
		if(isGetMove) {

			this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		}
	} else {
		window.alert("Canvas Constructor ERROR");
	}
};
View.prototype.onMouseOver =function() {
	this.isMouseOnCanvas = true;
};
View.prototype.onMouseOut = function() {
	this.isMouseOnCanvas = false;
	this.isMouseMove = false;
};
View.prototype.onMouseMove =function(e) {
	var rect = e.target.getBoundingClientRect();
	this.mousePos.x = e.clientX - rect.left;
	this.mousePos.y = e.clientY - rect.top;
	this.mousePos.isMouseMove = true;
};
View.prototype.drawMouseCursor = function (){
	this.ctx.beginPath();
	this.ctx.fillStyle = DRAW_COLOR;
	this.ctx.arc(this.mousePos.x, this.mousePos.y, 6,0, Math.PI*2.0,true);
	this.ctx.fill();
};
View.prototype.drawBg = function(bgColor){
	this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
};
Dot = function(pos, r, color, isDraw) {
	this.pos = pos;
	this.r = r;
	this.color = color;
	this.isDraw = isDraw;
};
Dot.prototype.drawMain = function(canvas, translate) {
	if(this.isDraw) {
		canvas.beginPath();
		canvas.fillStyle = this.color;
		canvas.lineWidth = 2;
		canvas.globalAlpha = 1.0;
		canvas.arc(this.pos.x + translate.x, this.pos.y+translate.y, this.r, 0, Math.PI*2.0,true);
		canvas.fill();
	}
	if(!this.isDraw) {
		var num = 10
		for(var i=0; i<num; i++) {
			canvas.beginPath();
			canvas.strokeStyle = '#fff';
			canvas.lineWidth = 2;
			canvas.globalAlpha = 0.8;
			var startAngle = 360/num * i * Math.PI / 180;
			var endAngle = 360/num * (i+0.5) * Math.PI / 180;
			canvas.arc(this.pos.x + translate.x, this.pos.y+translate.y, this.r, startAngle, endAngle, false);
			canvas.stroke();
		}	
	}
};
Dot.prototype.drawPreview = function(canvas, translate) {
	if(this.isDraw) {
		canvas.beginPath();
		canvas.fillStyle = this.color;
		canvas.lineWidth = 2;
		canvas.globalAlpha = 1.0;
		canvas.arc(this.pos.x + translate.x, this.pos.y+translate.y, this.r, 0, Math.PI*2.0,true);
		canvas.fill();
	}
};
Dot.prototype.drawHover = function(canvas, translate) {
	if(this.isDraw) {
		canvas.beginPath();
		canvas.fillStyle = this.color;
		canvas.lineWidth = 2;
		canvas.globalAlpha = 1.0;
		canvas.arc(this.pos.x + translate.x, this.pos.y+translate.y, this.r*1.5, 0, Math.PI*2.0,true);
		canvas.fill();
	} else {
		var num = 10
		for(var i=0; i<num; i++) {
			canvas.beginPath();
			canvas.strokeStyle = '#fff';
			canvas.lineWidth = 3;
			canvas.globalAlpha = 1;
			var startAngle = 360/num * i * Math.PI / 180;
			var endAngle = 360/num * (i+0.5) * Math.PI / 180;
			canvas.arc(this.pos.x + translate.x, this.pos.y+translate.y, this.r*1.5, startAngle, endAngle, false);
			canvas.stroke();
		}
	}
};
Dot.prototype.isPointOnDot = function(point, range, center) {
	var xl = this.pos.x+center.y-point.x;
	var yl = this.pos.y+center.x-point.y;
	var l2 = (xl*xl) + (yl*yl);
	var r2 = (this.r+range)*(this.r+range);
	if(l2 < r2) return true;
	else return false;
};


DotFrame = function(interval, radius, bgColor) {
	this.bgColor = bgColor;
	var dotData = new Array(DOT_NUM);
	for(var i=0; i<dotData.length; i++) {
		dotData[i] = new Dot(getDotPos(i, interval), radius, '#000', false);
	}

	this.arrDot = dotData;
};
DotFrame.prototype.drawMain = function(view, isHoverDot, hoverDotNum) {
	var center = new Vector2(view.width/2, view.height/2);
	/*
	View.ctx.globalCompositeOperation = "source-over";
    View.ctx.fillStyle = this.bgColor;
    View.ctx.fillRect(0, 0, View.width, View.height);
    */
    
	if(isHoverDot) {
		this.arrDot[hoverDotNum].drawHover(view.ctx, center);
	}
	
	for(var i=0; i<this.arrDot.length; i++) {
		if(!isHoverDot || i!=hoverDotNum) {
			this.arrDot[i].drawMain(view.ctx, center);
		}
	}
};
DotFrame.prototype.drawPreview = function(view, radius, interval) {
	//var dotData = new Array(DOT_NUM);
	var center = new Vector2(view.width/2, view.height/2);
	myform.mytext.value = 'summer';
	for(var i=0; i<this.arrDot.length; i++) {
		//dotData[i] = new Dot(getDotPos(i, interval), radius, this.arrDot[i].r, this.arrDot[i].isDraw);
		var dot = new Dot(getDotPos(i, interval), radius, this.arrDot[i].r, this.arrDot[i].isDraw);
		dot.drawPreview(view.ctx, center);
	}

};




DotAppFramework = function(mainCanvasName, previewCanvasName) {
	this.mainView = new View(mainCanvasName, MAINCANVAS_WIDTH, MAINCANVAS_HEIGHT, true);
	var arrPreview = new Array(8);
	for(var i=0; i<arrPreview.length; i++) { 
		arrPreview[i] = new View(previewCanvasName+""+(i+1), PREVIEWCANVAS_WIDTH, PREVIEWCANVAS_HEIGHT, false);
	}
	this.previewView = arrPreview;

	this.mainView.canvas.addEventListener('click', this.onClickMain.bind(this), false);
	for(var i=0; i<this.previewView.length; i++) { 
		this.previewView[i].canvas.addEventListener('click', this.onClickPreview.bind(this), false);
	}
	
	var frameData = new Array(8);
	for(var i=0; i<frameData.length; i++) {
		frameData[i] = new DotFrame(LINE_LENGTH, DOT_RADIUS, KIDS_GREEN);
	}
	this.arrDotFrame = frameData;
	this.currentColor = WHITE;
	this.currentFrame = 1;
	this.isHoverDot = false;
	this.hoverDotNum = -1;
	
};
DotAppFramework.prototype.start = function () {
	setInterval(this.loop.bind(this) , 33 );
};
DotAppFramework.prototype.onClickMain = function(e) {
	var rect = e.target.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	this.mainView.mousePos = new Vector2(x, y);
	if(this.isHoverDot) {
		if(this.arrDotFrame[this.currentFrame-1].arrDot[this.hoverDotNum].isDraw) {
			this.arrDotFrame[this.currentFrame-1].arrDot[this.hoverDotNum].isDraw = false;
		}
		else {
			this.arrDotFrame[this.currentFrame-1].arrDot[this.hoverDotNum].isDraw = true;
			this.arrDotFrame[this.currentFrame-1].arrDot[this.hoverDotNum].color = this.currentColor;
		}
		this.isHoverDot = false;
	}
	
};
DotAppFramework.prototype.onClickPreview = function(e) {
	for(var i=0; i<8; i++) {
		if(this.previewView[i].isMouseOnCanvas) {
			currentFrame = i+1;
		}
	}
};
DotAppFramework.prototype.drawMainView = function() {
	this.mainView.drawBg(this.arrDotFrame[this.currentFrame-1].bgColor);
	this.mainView.ctx.font = "bold 48px sans-serif";
	this.mainView.ctx.fillStyle = WHITE;
	this.mainView.ctx.fillText(this.currentFrame, 40, 60);

	this.arrDotFrame[this.currentFrame-1].drawMain(this.mainView, this.isHoverDot, this.hoverDotNum);
};
DotAppFramework.prototype.drawPreview = function() {
	for(var i=0; i<8; i++) {
		if(i==this.currentFrame-1) {
			this.previewView[i].drawBg(KIDS_GREEN);
		} else {
			this.previewView[i].drawBg('#aaa');
		}
		this.arrDotFrame[i].drawPreview(this.previewView[i], PREVIEW_LINE_LENGTH, PREVIEW_DOT_RADIUS);
	}
};
DotAppFramework.prototype.renewHoverNum = function() {
	this.isHoverDot = false;
	var center = new Vector2(this.mainView.width/2, this.mainView.height/2);
	for(var i=0; i<this.arrDotFrame[this.currentFrame-1].arrDot.length; i++) {
		if(this.arrDotFrame[this.currentFrame-1].arrDot[i].isPointOnDot(this.mainView.mousePos, 10, center)) {
			this.isHoverDot = true;
			this.hoverDotNum = i;
		}
	}
};

DotAppFramework.prototype.loop = function() {
	if(this.mainView.isMouseOnCanvas) {
		this.renewHoverNum();
		//window.alert();
	}
	this.drawMainView();
	this.drawPreview();
	//window.alert(this);
};
