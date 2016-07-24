

var currentColor = DRAW_COLOR;
var currentFrame = '1';
var hoverDotNum = -1;
var isHoverDot = false;



var mainCanvas = new Canvas('', '', 500, 500, '', false, false);
var dotAnimation = new DotAnimation('');





function init() {
	if(mainCanvas.init('mainCanvas', MAINCANVAS_WIDTH, MAINCANVAS_HEIGHT)) {
		dotAnimation.init(LINE_LENGTH, DOT_RADIUS, WHITE);	
		setInterval(loop , 33 );
	}

	
}

function setup() {
	//outerDiv  = document.getElementById('outer');
    //canvasDiv = document.getElementById('canvasContainer01');
}

function loop() {
	draw();
}

function draw() {
	/*
	mainCanvas.ctx.globalCompositeOperation = "source-over";
    mainCanvas.ctx.fillStyle = MIRAI_ORANGE;
    mainCanvas.ctx.fillRect( 0 , 0 , mainCanvas.width , mainCanvas.height );
    */
	if(mainCanvas.isMouseMove) {
		dotAnimation.arrDotFrame[currentFrame-1].getHoverNum(mainCanvas);
	}

	dotAnimation.arrDotFrame[currentFrame-1].draw(mainCanvas, false);


	if(isHoverDot) {
		dots[hoverDotNum].drawHover(ctx1);
	}
	for(var i=0; i<dots.length; i++) {
		dots[i].draw(ctx1, center, dots[i].isDraw, !dots[i].isDraw);
	}
	if(isMouseOnCanvas) {
		drawMouseCursor(mousePos.x,mousePos.y);
	}
	if(isMouseMove) {
		if(x==mousePos.x && y==mousePos.y) isMouseMove = false;
	}
}

//クリックした際に呼び出される
function onClick(e) {
	var rect = e.target.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;
	mousePos = new Vector2(x, y);
	myform.mytext.value= "" + mousePos.x + "," +  mousePos.y + "";
	if(isHoverDot) {
		if(dots[hoverDotNum].isDraw) {
			dots[hoverDotNum].isDraw = false;
		}
		else {
			dots[hoverDotNum].isDraw = true;
			dots[hoverDotNum].color = currentColor;
		}
		
	}
}



//円の描画
/**
var x = x座標
var y = y座標
var r = 半径
ctx.beginPath();
ctx.fillStyle = 塗りの色
ctx.strokeStyle = 線の色
ctx.globalAlpha = 透明度
ctx.arc(x, y, r, 0,Math.PI*2.0,true);
ctx.fill();
*/

/*
ランダムな色を生成
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
*/
