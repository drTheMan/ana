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
		if(event.which == 49) # key '1'
			@app().createDisturbance GridDisturbance
		if(event.which == 50)
			@app().createDisturbance VerticalDisturbance
		if(event.which == 51)
			@app().createDisturbance BumpDisturbance

