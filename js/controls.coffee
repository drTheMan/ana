class @Controls
	constructor: (_opts) ->
		@options = _opts
		@setupEventListeners()

	app: -> @options.app

	bind: ( scope, fn ) ->
		-> fn.apply scope, arguments

	setupEventListeners: ->
		document.addEventListener 'mousedown', @bind(this, @mousedown), false

	mousedown: ( event ) ->
		event.preventDefault()
		event.stopPropagation()

		@app().createDisturbance()
