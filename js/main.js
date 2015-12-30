var myProject = (function ($) {
	// --------------------------------------------------------------
	// Binding UI events
	// --------------------------------------------------------------
	
	function bindUiEvents() {
		// This is where you can attach events to DOM elements.
		// Whenever possible, business logic should be on its
		// separate function.
	}

	// --------------------------------------------------------------
	// Templating
	// --------------------------------------------------------------

	// Section for functions that render a partial on the client.
	// They should all be prefixed with the word "render", receive
	// the data necessary and return the rendered HTML.
	function renderArticle(data) {
		var html = '';

		html += '<article>' + data.content + '</article>';

		return html;
	}

	// --------------------------------------------------------------
	// Asynchronous calls
	// --------------------------------------------------------------

	function getArticles() {
		// A function that gets asynchronous data. These functions
		// should never interact with the DOM; they would call
		// another function that performs those interactions.
	}

	// --------------------------------------------------------------
	// Initialisation
	// --------------------------------------------------------------

	function init() {
		// Any initialisation code necessary.
	}

	init(); // Do we want the block to be initialised automatically?

	// --------------------------------------------------------------
	// Public access
	// --------------------------------------------------------------

	return {
		// Here we define what functions/variables form our public
		// API, to allow communication with other scripts.
		init: init
	}

})(jQuery); // We pass the jQuery object to our IIFE if we need it.
