Harmony = {};

Harmony.init = function() {
	this.scene = this.createScene();
	this.initVfx();

	this.disturbances = [];
	this.controls = new Controls({app: this});
};

Harmony.animationFrame = function(){
	Harmony.animate();
};

Harmony.initVfx = function(){
	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	// this.camera = new THREE.OrthographicCamera(-1200, 1000, -1100, 1200, 10, 10000);

	this.camera.position.z = 500;
	// this.renderer = new THREE.CanvasRenderer();
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);
};

Harmony.createScene = function(){
	var scene = new THREE.Scene();

	this.grid = new window.Grid({
		dimensions: new THREE.Vector2(10,10),
		position: new THREE.Vector3(-1000, -900, -1000),
		cell_size: new THREE.Vector3(200, 200, 10),
		materials: [new THREE.MeshBasicMaterial({color: 0xffbb00}), new THREE.MeshBasicMaterial({color: 0xcc9900}), new THREE.MeshBasicMaterial({color: 0xddaa00})]
	});
	// this.grid.boxes()[3].material.color.setHex(0xff0f0f);
	this.grid.addBoxesToScene(scene)

	return scene;
};

Harmony.animate = function() {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(Harmony.animationFrame);

	for(var i=0; i<this.disturbances.length; i++){
		if(this.disturbances[i].done()){
			console.log("Disturbance done, removing after "+this.disturbances[i].stepCount()+" steps");
			this.disturbances.splice(i, 1);
		} else {
			this.disturbances[i].step();
		}
	}

	this.renderer.render(this.scene, this.camera);
};

Harmony.createDisturbance = function(){
	this.disturbances.push(new GridDisturbance({grid: this.grid}));
};