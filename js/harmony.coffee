class @Harmony
	init: ->
		@scene = @createScene()
		@initVfx()
		@disturbances = []
		@controls = new Controls({app: this})

	initVfx: ->
		# @camera = new THREE.OrthographicCamera(-1200, 1000, -1100, 1200, 10, 10000)
		@camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
		@camera.position.z = 500
		
		# @renderer = new THREE.CanvasRenderer()
		@renderer = new THREE.WebGLRenderer()

		@renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

	createScene: ->
		scene = new THREE.Scene()

		@grid = new window.Grid
			dimensions: new THREE.Vector2(10,10),
			position: new THREE.Vector3(-1000, -900, -1000),
			cell_size: new THREE.Vector3(200, 200, 10),
			materials: [new THREE.MeshBasicMaterial({color: 0xffbb00}), new THREE.MeshBasicMaterial({color: 0xcc9900}), new THREE.MeshBasicMaterial({color: 0xddaa00})]

		# grid.boxes()[3].material.color.setHex(0xff0f0f)
		@grid.addBoxesToScene(scene)

		return scene

	update: ->
		for disturbance, i in @disturbances
			if disturbance.done()
				console.log("Disturbance done, removing after "+disturbance.stepCount()+" steps")
				@disturbances.splice(i, 1)
			else
				disturbance.step()

	draw: ->
		@renderer.render(@scene, @camera)

	createDisturbance: ->
		@disturbances.push(new GridDisturbance({grid: @grid}))
