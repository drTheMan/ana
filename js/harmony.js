Harmony = {};

Harmony.init = function() {
	this.scene = this.createScene();
	this.initVfx();
};

Harmony.animationFrame = function(){
	Harmony.animate();
};

Harmony.initVfx = function(){
	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	this.camera.position.z = 500;
	// this.renderer = new THREE.CanvasRenderer();
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);
};

Harmony.createScene = function(){
	var scene = new THREE.Scene();

	// this.geometry = new THREE.CubeGeometry(200, 200, 200);
	// this.material = new THREE.MeshBasicMaterial({
	//     color: 0xff00ff,
	//     wireframe: true
	// });

	// this.mesh = new THREE.Mesh(this.geometry, this.material);
	// this.mesh2 = new THREE.Mesh(this.geometry, this.material);
	// this.mesh3 = new THREE.Mesh(this.geometry, this.material);
	// this.mesh4 = new THREE.Mesh(this.geometry, this.material);

	// scene.add(this.mesh);
	// scene.add(this.mesh2);
	// scene.add(this.mesh3);
	// scene.add(this.mesh4);

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

	this.animateBoxes();
	this.grid.animateBoxes();

	this.renderer.render(this.scene, this.camera);
};

Harmony.animateBoxes = function(){
	// this.mesh.rotation.x += 0.01;
	// this.mesh.rotation.y += 0.02;
	// this.mesh2.rotation.x -= 0.01;
	// this.mesh2.rotation.y -= 0.02;
	// this.mesh3.rotation.x += 0.02;
	// this.mesh3.rotation.y += 0.01;
	// this.mesh4.rotation.x -= 0.02;
	// this.mesh4.rotation.y -= 0.01;

};