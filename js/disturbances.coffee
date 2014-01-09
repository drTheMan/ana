class @DisturbancePicker
	constructor: (_opts) -> @options = _opts

	allClasses: -> [GridDisturbance, VerticalDisturbance, BumpDisturbance, CircularDisturbance, EqualizerDisturbance]	
	randomClass: -> @allClasses()[Math.floor(Math.random() * @allClasses.length)]

	createDisturbance: (klass) ->
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


class @GridDisturbance extends Disturbance
	speed: 0.001

	performStep: ->
		for box, i in @options.grid.boxes()
			box.rotation.x += @speed*(i+1)

	done: ->
		# takes 6283 steps on a 100 cell grid
		# val = Math.abs(((0.001*@stepCount()) % THREE.Math.PI) - THREE.Math.PI)
		# return true if @stepCount() > 0 && val < 0.001
		return true if @stepCount() * @speed >= Math.PI
		return false


class @VerticalDisturbance extends Disturbance
	speed: 0.001

	performStep: ->
		for x in [0..(@options.grid.cols()-1)]
			for y in [0..(@options.grid.rows()-1)]
				@options.grid.getBoxXY(x,y).rotation.y += @speed * (x * @grid().rows() + y)

	done: ->
		return true if @stepCount() > 0 && @stepCount() * @speed >= Math.PI
		return false


class @BumpDisturbance extends Disturbance
	performStep: ->
		@options.grid.boxes()[0].position.z += (@stepCount() - 5) * 10

	done: -> @stepCount() >= 11


class @CircularDisturbance extends Disturbance
	center: -> @_center ||= @grid().randomBox().position;
	totalSteps: -> @_totalSteps ||= Math.floor(Math.random()*100)
	sinStep: -> THREE.PI2 / @totalSteps()

	performStep: -> 
		for box, i in @grid().boxes()
			distance_to_center = box.position.distanceTo(@center())
			# box.position.x += Math.sin(@sinStep() * @stepCount()) * distance_to_center * 0.0001
			box.position.z += Math.sin(Math.random() * THREE.Math.PI2) * 30

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

