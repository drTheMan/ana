class @DisturbancePicker
	constructor: (_opts) -> @options = _opts

	allClasses: -> [HorizontalDisturbance, VerticalDisturbance, BumpDisturbance, CircularDisturbance, EqualizerDisturbance]	
	randomClass: -> @allClasses()[Math.floor(Math.random() * @allClasses.length)]

	indexDisturbance: (idx) ->
		console.log "Creating disturbance from class index "+idx
		new (@allClasses()[idx])(@options)

	createDisturbance: (klass) ->
		console.log "Creating random disturbance"
		new (klass || @randomClass())(@options)


class Disturbance
	constructor: (_opts) -> @options = _opts
	stepCount: -> @_stepCount ||= 0
	grid: -> @options.grid

	step: ->
		@performStep()
		@_stepCount = @stepCount() + 1

	performStep: ->

	done: ->


class @HorizontalDisturbance extends Disturbance
	speed: 0.001

	performStep: ->
		for box, i in @options.grid.boxes()
			box.rotation.x += @speed*(i+1)

	done: ->
		return true if @stepCount() * @speed >= Math.PI
		return false


class @VerticalDisturbance extends Disturbance
	speed: 0.001

	performStep: ->
		for x in [0..(@options.grid.cols()-1)]
			for y in [0..(@options.grid.rows()-1)]
				@options.grid.getBoxXY(x,y).rotation.y += @speed * (x * @grid().rows() + y)

	done: ->
		return true if @stepCount() * @speed >= Math.PI
		return false


class @BumpDisturbance extends Disturbance
	performStep: ->
		@options.grid.boxes()[0].position.z += (@stepCount() - 5) * 10

	done: -> @stepCount() >= 11


class @CircularDisturbance extends Disturbance
	constructor: (_opts) ->
		super(_opts)
		console.log("CircularDisturbance position: "+@center().x+", "+@center().y)

	center: -> @_center ||= @grid().randomBox().position;
	totalSteps: -> @_totalSteps ||= Math.floor(Math.random()*500)+100
	sinStep: -> THREE.PI2 / @totalSteps()
	sinRoot: -> @_sinRoot ||= Math.random(THREE.PI2)
	factor: -> @_factor ||= Math.random(0.001) + 0.000001
	rippleSpeed: -> @_rippleSpeed ||= 0.1

	performStep: -> 
		for box, i in @grid().boxes()
			amplitude = box.position.distanceTo(@center()) * @factor() * 0.01
			box.position.z += Math.cos(@rippleSpeed() * @stepCount()) * amplitude

	done: -> @stepCount() >= @totalSteps()


class @EqualizerDisturbance extends Disturbance
	center: -> @_center ||= @grid().randomBox().position;
	totalSteps: -> @_totalSteps ||= Math.floor(Math.random()*100)
	sinStep: -> THREE.PI2 / @totalSteps()

	performStep: -> 
		for box, i in @grid().boxes()
			distance_to_center = box.position.distanceTo(@center())
			# box.position.x += Math.sin(@sinStep() * @stepCount()) * distance_to_center * 0.0001
			box.position.z += Math.sin(Math.random() * THREE.Math.PI2) * 30

	done: -> @stepCount() >= @totalSteps()

