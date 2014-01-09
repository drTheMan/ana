class @Controls
	constructor: (_opts) ->
		@options = _opts
		@setupEventListeners()

	app: -> @options.app

	bind: ( scope, fn ) ->
		-> fn.apply scope, arguments

	setupEventListeners: ->
		document.addEventListener 'mousedown', @bind(this, @mousedown), false
		document.addEventListener 'keydown', @bind(this, @keydown), false

	mousedown: ( event ) ->
		event.preventDefault()
		event.stopPropagation()

		console.log "Mousedown"
		@app().createDisturbance()

	keydown: (event ) ->
		# event.preventDefault()
		# event.stopPropagation()
		console.log "Keydown (event.which = " + event.which + ")"

		disturbance_keys = {
			49: GridDisturbance,
			50: VerticalDisturbance,
			51: BumpDisturbance,
			52: CircularDisturbance,
			53: EqualizerDisturbance
		}

		@app().createDisturbance(disturbance_keys[event.which]) if disturbance_keys[event.which]			

		if(event.which == 27) # escape
			console.log '[ESC] clearing disturbances array'
			@app().disturbances = []
			@app().grid.reset();