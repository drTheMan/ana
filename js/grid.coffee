class @Grid
	constructor: (_opts) ->
		@options = _opts;

	dimensions: -> @_dimensions ||= @options.dimensions || new THREE.Vector2(10, 10)
	cols: -> @dimensions().x
	rows: -> @dimensions().y
	cell_size: -> @_cell_size ||= @options.cell_size || new THREE.Vector3(200, 200, 200)

	boxes: -> @_boxes ||= @generateBoxes()

	generateBoxes: ->
		geometry = new THREE.CubeGeometry(200, 200, 200)
		material = new THREE.MeshBasicMaterial({
	    	color: 0x0000ff,
	    	wireframe: true
		})

		boxes = []

		for y in [0..@rows()-1]
			for x in [0..@cols()-1]
				boxes.push(new THREE.Mesh(geometry, material))

		return boxes;

	animateBoxes: ->
		for box, i in @boxes()
			box.rotation.x += 0.01*(i+1)
			# box.rotation.y += i*0.1

	addBoxesToScene: (scene) ->
		for box in @boxes()
			console.log 'adding'
			console.log box
			scene.add(box)
