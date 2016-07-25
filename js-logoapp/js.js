var dotAppFramework;
function init() {
	myform.mytext.value = 'init';
	dotAppFramework = new DotAppFramework('mainCanvas', 'previewCanvas');

	dotAppFramework.start();
	//setInterval(loop , 33 );
}

function loop() {

}