// Helper function to create a span tag
function buildSpecialText(text) {
	return "<span class='special'>" + text + "</span>";
};

// Escape plain text before including it in an HTML-formatted console response
function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

// Choose art that fits the terminal and retain artist attribution on new pieces.
function renderCat(consoleElement) {
  var style = getComputedStyle(consoleElement);
  var measure = document.createElement('canvas').getContext('2d');
  measure.font = style.fontSize + ' ' + style.fontFamily;
  var width = consoleElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  var columns = Math.floor(width / measure.measureText('M').width);
  var candidates = prompts.cats.filter(function(cat) {
    var art = typeof cat === 'string' ? cat : cat.art;
    return art.split('\n').every(function(line) { return line.length <= columns; });
  });
  // The compact drawings fit small screens without shrinking the terminal font.
  if (!candidates.length) candidates = prompts.cats.filter(function(cat) { return typeof cat !== 'string'; });
  var cat = candidates[Math.floor(Math.random() * candidates.length)];
  var art = typeof cat === 'string' ? cat : cat.art;
  var result = "\n<span class='preformatted ascii-art'>" + escapeHtml(art) + "</span>";
  if (cat.artist) {
    var credits = document.createElement('span');
    credits.className = 'cat-credits';
    credits.appendChild(document.createTextNode('Credits: '));
    var link = document.createElement('a');
    link.href = cat.source;
    link.textContent = '[' + cat.artist + ']';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    credits.appendChild(link);
    result += credits.outerHTML;
  }
  return result + '\n\n';
}

// Create a lambda function that returns the data for a command from prompts
function buildLambda(command) {
	return function() {
    return format(command);
  };
}

// Format the response data from prompts
// If the data is a string, normalize its outer whitespace. If it is a list,
// convert it into a string. Add one blank line around either response.
function format(command) {
  // Retrieve raw response data from prompts
	var unformattedResponse = prompts[command];
  var formattedResponse = "";

  // If the response type is a string, return it
	if (typeof unformattedResponse == "string") {
		formattedResponse = "\n" + unformattedResponse.trim() + "\n\n";
  // Otherwise, the response type is a list, so convert the list to a string
	} else {
    formattedResponse = "\n" + formatList(unformattedResponse) + "\n";
  }
  return formattedResponse;
};

// Convert a list of data from prompts into a string
function formatList(list) {
	var response = "<span class='terminal-list'>";
  // Loop through each piece of data and append a formatted version of it
  // to the response string
	for (var listItemIndex=0; listItemIndex<list.length; listItemIndex++) {
		var formattedItem = formatObject(list[listItemIndex]);
		response += "<span class='indented-list-item'>" + formattedItem + "</span>";
	}
	return response + "</span>";
};

// Loop through an object and format its entries to display on the console
function formatObject(obj) {
	var dataItems = [];
	for (var property in obj) {
    // Only add property if it wasn't inherited
    // This is to avoid adding default object properties
		if (obj.hasOwnProperty(property)) {
			dataItems.push(obj[property]);
		}
	}
	return dataItems.join(" - ");
};

// Use fuse to find similar commands to the one entered
function search(list, searchitem) {
  // Create a copy of fuseOptions using the extend function
  var customOptions = $.extend({}, fuseOptions);
	customOptions['distance'] = (searchitem.length<=2? 0 : 100);
	return new Fuse(list, customOptions).search(searchitem);
}

var fuseOptions = {
	include: ["score"],
	shouldSort: true,
	threshold: 0.3,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	keys: ['command']
};

// Each command output owns its filters and disclosure state. Unique IDs keep
// aria-controls valid when publications is requested more than once.
var publicationViewId = 0;
function initializePublications(output) {
  var view = output.querySelector('.publications');
  if (!view) return null;

  var viewId = ++publicationViewId;
  var items = Array.from(view.querySelectorAll('.publication'));
  var filters = Array.from(view.querySelectorAll('[data-filter]'));
  items.forEach(function(item, index) {
    var abstract = item.querySelector('.publication-abstract');
    var toggle = item.querySelector('.publication-toggle');
    abstract.id = 'publication-abstract-' + viewId + '-' + index;
    toggle.setAttribute('aria-controls', abstract.id);
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'publication-close';
    close.textContent = '[-] Close ' + toggle.dataset.label.toLowerCase();
    close.setAttribute('aria-controls', abstract.id);
    abstract.appendChild(close);
  });

  // jqconsole otherwise refocuses the prompt on mouseup (desktop) or cancels
  // the click (mobile). Let native buttons and links receive these events.
  view.addEventListener('mouseup', function(event) {
    event.stopPropagation();
  });
  view.addEventListener('click', function(event) {
    event.stopPropagation();
    var filter = event.target.closest('[data-filter]');
    if (filter) {
      var category = filter.dataset.filter;
      var count = 0;
      filters.forEach(function(button) {
        button.setAttribute('aria-pressed', String(button === filter));
      });
      items.forEach(function(item) {
        item.hidden = category !== 'all' && item.dataset.category !== category;
        if (!item.hidden) count++;
      });
      view.querySelector('.publication-count').textContent = category === 'all'
        ? 'Showing all ' + count + ' publications'
        : 'Showing ' + count + ' of ' + items.length + ' publications';
      return;
    }

    var action = event.target.closest('.publication-toggle, .publication-close');
    if (action) {
      var item = action.closest('.publication');
      var toggle = item.querySelector('.publication-toggle');
      var abstract = item.querySelector('.publication-abstract');
      var closing = action.classList.contains('publication-close');
      abstract.hidden = closing || !abstract.hidden;
      toggle.setAttribute('aria-expanded', String(!abstract.hidden));
      toggle.textContent = (abstract.hidden ? '[+] ' : '[-] ') + toggle.dataset.label;
      if (closing) toggle.focus({ preventScroll: true });
    }
  });
  return view;
}
