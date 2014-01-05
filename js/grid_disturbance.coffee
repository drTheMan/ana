class @GridDisturbance
	constructor: (_opts) -> @options = _opts

	stepCount: -> @_stepCount ||= 0

	step: ->
		for box, i in @options.grid.boxes()
			box.rotation.x += 0.001*(i+1)

		@_stepCount = @stepCount() + 1

	done: ->
		# takes 6283 steps on a 100 cell grid
		val = Math.abs(((0.001*@stepCount()) % THREE.Math.PI) - THREE.Math.PI)
		return true if @stepCount() > 0 && val < 0.001
		return false