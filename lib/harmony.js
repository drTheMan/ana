Harmony = {};

Harmony.init = function() {
	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	this.camera.position.z = 1000;

	this.scene = new THREE.Scene();

	this.geometry = new THREE.CubeGeometry(200, 200, 200);
	this.material = new THREE.MeshBasicMaterial({
	    color: 0xff00ff,
	    wireframe: true
	});

	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh2 = new THREE.Mesh(this.geometry, this.material);
	this.mesh3 = new THREE.Mesh(this.geometry, this.material);
	this.mesh4 = new THREE.Mesh(this.geometry, this.material);

	this.scene.add(this.mesh);
	this.scene.add(this.mesh2);
	this.scene.add(this.mesh3);
	this.scene.add(this.mesh4);

	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(this.renderer.domElement);
};

Harmony.anim = function(){
	Harmony.animate();
}

Harmony.animate = function() {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(Harmony.anim);

	this.mesh.rotation.x += 0.01;
	this.mesh.rotation.y += 0.02;
	this.mesh2.rotation.x -= 0.01;
	this.mesh2.rotation.y -= 0.02;
	this.mesh3.rotation.x += 0.02;
	this.mesh3.rotation.y += 0.01;
	this.mesh4.rotation.x -= 0.02;
	this.mesh4.rotation.y -= 0.01;
	this.renderer.render(this.scene, this.camera);
};