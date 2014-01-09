class @Grid
	constructor: (_opts) ->
		@options = _opts

	position: -> @_position ||= @options.position || new THREE.Vector3(0,0,0)
	dimensions: -> @_dimensions ||= @options.dimensions || new THREE.Vector2(10, 10)
	cols: -> @dimensions().x
	rows: -> @dimensions().y
	cell_size: -> @_cell_size ||= @options.cell_size || new THREE.Vector3(200, 200, 200)
	spacing: -> @_spacing ||= @options.spacing || @cell_size()
	geometry: -> @_geometry ||= @options.geometry || new THREE.CubeGeometry(@cell_size().x, @cell_size().y, @cell_size().z)
	materials: -> @options.materials || @_materials ||= [new THREE.MeshBasicMaterial({color: 0xffffff})]
	random_material: -> @materials()[Math.floor(Math.random() * @materials().length)]

	boxes: -> @_boxes ||= @generateBoxes()

	generateBoxes: ->
		boxes = []

		for y in [0..@rows()-1]
			for x in [0..@cols()-1]
				mesh = new THREE.Mesh(@geometry(), @random_material())
				mesh.position.copy(@position())
				mesh.position.add(new THREE.Vector3(x*@spacing().x, y*@spacing().y, 0))
				boxes.push(mesh)

		return boxes;

	addBoxesToScene: (scene) ->
		for box in @boxes()
			scene.add(box)

	getBoxXY: (x,y) ->
		@boxes()[@cols()*y+x]

	reset: ->
		for y in [0..@rows()-1]
			for x in [0..@cols()-1]
				box = @getBoxXY(x,y)
				box.rotation.x = 0
				box.rotation.y = 0
				box.rotation.z = 0
				box.position.copy(@position())
				box.position.add(new THREE.Vector3(x*@spacing().x, y*@spacing().y, 0))
