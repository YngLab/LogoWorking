const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const MAINCANVAS_WIDTH = 500;
const MAINCANVAS_HEIGHT = 500;
const PREVIEWCANVAS_WIDTH = 500;
const PREVIEWCANVAS_HEIGHT = 100;
const LINE_LENGTH = 100;
const DOT_RADIUS = LINE_LENGTH/8;
const INIT_COLOR = '#ddd';
const WHITE = '#fff';
const KIDS_GREEN = '#9c3';
const MIRAI_ORANGE = '#f90';
const BACKGROUND_COLOR = WHITE;
const DRAW_COLOR = KIDS_GREEN;

Vector2 = function(x, y) {
	this.x = x;
	this.y = y;
}

Rect = function(pos, w, h, color) {
	this.pos = pos;
	this.w = w;
	this.h = h;
	this.color = color;
}
Rect.prototype.draw = function(canvas, isFill, isStroke) {
	canvas.globalCompositeOperation = "source-over";
	if(isFill) {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.pos.x, this.pos.y , this.w , this.h);
    }
    if(isStroke) {
	    canvas.strokeStyle = this.color;
	    canvas.strokeRect(this.pos.x, this.pos.y , this.w , this.h);
    }
}

Canvas = function(ctx, canvas, width, height, mousePos, isMouseOnCanvas, isMouseMove) {
	this.ctx = ctx;
	this.canvas = canvas;
	this.width = width;
	this.height = height;
	this.mousePos = mousePos;
	this.isMouseOnCanvas = isMouseOnCanvas;
	this.isMouseMove = isMouseMove;
}
Canvas.prototype.onMouseOver =function() {
	this.isMouseOnCanvas = true;
}
Canvas.prototype.onMouseOut = function() {
	this.isMouseOnCanvas = false;
	this.isMouseMove = false;
}
Canvas.prototype.onMouseMove = function(e) {
	var rect = e.target.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	this.isMouseMove = true;
	this.mousePos = new Vector2(x, y);
}
Canvas.prototype.init = function(canvasName, width, height){
	this.width = width;
	this.height = height;
	this.mousePos = new Vector2(0, 0);
	this.isMouseOnCanvas = false;
	this.isMouseMove = false;
	this.canvas = document.getElementById(canvasName);
	if (this.canvas.getContext){
		this.ctx = this.canvas.getContext('2d');
		this.canvas.addEventListener('mouseover', this.onMouseOver, false);
		this.canvas.addEventListener('mouseout', this.onMouseOut, false);
		this.canvas.addEventListener('mousemove', this.onMouseMove, false);
		//this.canvas.addEventListener('click', this.onClick, false);
		return true;
	} else {
		return false;
	}
}
Canvas.prototype.drawMouseCursor = function (){
	ctx1.beginPath();
	ctx1.fillStyle = currentColor;
	ctx1.arc(mousePos.x, mousePos.y, 6,0, Math.PI*2.0,true);
	ctx1.fill();
}

Dot = function(pos, r, color, isDraw) {
	this.pos = pos;
	this.r = r;
	this.color = color;
	this.isDraw = isDraw
}
Dot.prototype.draw = function(canvas, center, isFill, isStroke) {
	canvas.beginPath();
	canvas.fillStyle = this.color;
	canvas.strokeStyle = '#000';
	canvas.lineWidth = 2;
	canvas.globalAlpha = 1.0;
	canvas.arc(this.pos.x + center.x, this.pos.y+center.y, this.r, 0, Math.PI*2.0,true);
	if(isFill) {
		canvas.fill();
	}
	if(isStroke) {
		canvas.stroke();
	}
}
Dot.prototype.drawHover = function(canvas) {
	canvas.beginPath();
	canvas.strokeStyle = currentColor;
	canvas.lineWidth = 8;
	canvas.globalAlpha = 1.0;
	canvas.arc(this.pos.x + center.x, this.pos.y+center.y, this.r, 0, Math.PI*2.0,true);
	canvas.stroke();
}
Dot.prototype.isPointOnDot = function(point, range) {
	var xl = this.pos.x+center.y-point.x;
	var yl = this.pos.y+center.x-point.y;
	var l2 = (xl*xl) + (yl*yl);
	var r2 = (this.r+range)*(this.r+range);
	if(l2 < r2) return true;
	else return false;
}

function getDotPos(num, interval) {
	var pos = new Vector2(0,0);
	var angle = [-90, -30, 30, 90, 150, 210];
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

DotFrame = function(arrDot, bgColor) {
	this.arrDot = arrDot;
	this.bgColor = bgColor;
}
DotFrame.prototype.init = function(interval, radius, bgColor) {
	this.bgColor = bgColor;
	var dotData = new Array(19);
	for(var i=0; i<dotData.length; i++) {
		dotData[i] = new Dot('', '', '', '');
		dotData[i].pos = getDotPos(i, interval);
		dotData[i].r = radius;
		dotData[i].color = '#000'
		dotData[i].isDraw = false;
	}
	this.arrDot = dotData;
}
DotFrame.prototype.draw = function(canvas, isHoverDot) {
	canvas.ctx.globalCompositeOperation = "source-over";
    canvas.ctx.fillStyle = this.bgColor;
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);

	if(isHoverDot) {
		this.arrDot[hoverDotNum].drawHover(canvas.ctx);
	}
	var center = new Vector2(canvas.width/2, canvas.height/2);
	for(var i=0; i<this.arrDot.length; i++) {
		this.arrDot[i].draw(canvas.ctx, center, this.arrDot[i].isDraw, !this.arrDot[i].isDraw);
	}
}
DotFrame.prototype.getHoverNum = function(canvas) {
	isHoverDot = false;
	for(var i=0; i<dots.length; i++) {
		if(this.arrDot[i].isPointOnDot(canvas.mousePos, 10)) {
			isHoverDot = true;
			hoverDotNum = i;
		}
	}
}

DotAnimation = function(arrDotFrame) {
	this.arrDotFrame = arrDotFrame;
}
DotAnimation.prototype.init = function(interval, radius, bgColor) {
	var frameData = new Array(8);
	for(var i=0; i<frameData.length; i++) {
		frameData[i] = new DotFrame('', '');
		frameData[i].init(interval, radius, bgColor);
	}
	this.arrDotFrame = frameData;
}

DotAppFramework = function(mainCanvas, previewCanvas, dotAnimation, currentColor, currentFrame, hoverDotNum, isHoverDot) {
	this.mainCanvas = mainCanvas;
	this.previewCanvas = previewCanvas;
	this.dotAnimation = dotAnimation;
	this.currentColor = currentColor;
	this.currentFrame = currentFrame;
	this.hoverDotNum = hoverDotNum;
	this.isHoverDot = isHoverDot;
}
DotAppFramework.prototype.init = function (mainCanvasName, previewCanvasName) {
	var isLoadMainCanvas = this.mainCanvas.init(mainCanvasName, MAINCANVAS_WIDTH, MAINCANVAS_HEIGHT);
	var isLoadPreviewCanvas = this.previewCanvas.init(previewCanvasName, PREVIEWCANVAS_WIDTH, PREVIEWCANVAS_HEIGHT);
	if(isLoadMainCanvas && isLoadPreviewCanvas) {
		this.dotAnimation.init(LINE_LENGTH, DOT_RADIUS, WHITE);	
		setInterval(loop , 33 );
	} else {
		//error
		window.alert('canvas init ERROR');
	}
};
DotAppFramework.prototype.loop = function() {

}