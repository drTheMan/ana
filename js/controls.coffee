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

		console.log "Mousedown - creating random disturbance"
		@app().disturbances.push( new DisturbancePicker({grid: @app().grid}).createDisturbance() )
		@app().createDisturbance()

	keydown: (event ) ->
		# event.preventDefault()
		# event.stopPropagation()
		console.log "Keydown (event.which = " + event.which + ")"

		if event.which >= 48 && event.which <= 57 # 0 - 9
			@app().disturbances.push( new DisturbancePicker({grid: @app().grid}).indexDisturbance(event.which - 48) ) 

		if(event.which == 27) # escape
			console.log '[ESC] clearing disturbances array'
			@app().disturbances = []
			@app().grid.reset();

		@app().togglePause() if event.which == 32 # SPACE

		if event.which == 13 # ENTER
			@app().renderer.preserveDrawingBuffer = true
			window.open( @app().renderer.domElement.toDataURL( 'image/png' ), 'screenshot' );

