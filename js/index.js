$(document).ready(function() {
	var routes = {
		"/about": "about",
		"/bio": "bio",
		"/contact": "contact",
		"/help": "help",
		"/pgp": "pgp",
		"/research": "research",
		"/social": "social",
		"/supervision": "supervision"
	};
	var initialPath = window.location.pathname.replace(/\/+$/, "") || "/";
	// GitHub Pages also serves 404.html for mistyped file URLs. Only known
	// command routes should turn that error page into an interactive terminal.
	if (initialPath !== "/" && initialPath !== "/index.html" && !routes[initialPath]) {
		$("#console").remove();
		return;
	}
	$("#not-found").remove();
	$("#console").prop("hidden", false);

	var jqconsole = $("#console").jqconsole("", "kwei> ", null, true);
	var followPrompt = initialPath !== "/research";
	var scrollToEnd = jqconsole._ScrollToEnd;
	var scrollWindowToPrompt = jqconsole.ScrollWindowToPrompt;
	// Research leaves the viewport at the start of its long output. Other
	// commands retain jqconsole's normal cursor-following behavior.
	jqconsole._ScrollToEnd = function() {
		if (followPrompt) return scrollToEnd.call(this);
		var position = this.$prompt_cursor.position();
		this.$input_container.css({ left: position.left, top: position.top });
	};
	jqconsole.ScrollWindowToPrompt = function() {
		// Also guard callbacks already queued before research was submitted.
		if (followPrompt) return scrollWindowToPrompt.call(this);
	};
	jqconsole.Focus = function() {
		if (!this.IsDisabled()) this.$input_source[0].focus({ preventScroll: true });
	};
	// The input is already visually clipped. The library's delayed iOS hide
	// would drop keyboard focus while users type or return from a close button.
	jqconsole.$input_source.off("focus").on("focus", function() {
		jqconsole._ScrollToEnd();
		jqconsole.$console_focused = true;
		jqconsole.$console.removeClass("jqconsole-blurred");
	});
	jqconsole.auto_focus = true;
	jqconsole.SetKeyPressHandler(function() {
		followPrompt = true;
	});
	jqconsole.$input_source.on("paste", function() {
		followPrompt = true;
	});
	// Let keyboard users leave the terminal input to browse the latest list.
	jqconsole.SetControlKeyHandler(function(event) {
		if (event.which === 13 && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) {
			var command = findCommand(jqconsole.GetPromptText().toLowerCase().trim());
			// Set this before jqconsole writes the submitted command itself.
			followPrompt = !command || command.path !== "/research";
		}
		if (event.which === 9 && !event.ctrlKey && !event.metaKey && !event.altKey) {
			var views = document.querySelectorAll('.publications');
			var view = views[views.length - 1];
			if (view) {
				var controls = Array.from(view.querySelectorAll('button, a')).filter(function(control) {
					return !control.closest('[hidden]');
				});
				controls[event.shiftKey ? controls.length - 1 : 0].focus();
				return false;
			}
		}
	});
	var commands = [
		{ aliases: ["help", "?", "ls", "commands"], callback: buildLambda("help"), path: "/help" },
		{ aliases: ["hello", "kevin", "kwei", "hi", "mission", "description", "why", "intro", "info", "about"], callback: buildLambda("intro"), path: "/about" },
		{ aliases: ["bio", "biog", "biography", "biographical", "profile", "headshot", "photo", "picture", "portrait"], callback: buildLambda("bio"), path: "/bio" },
		{ aliases: ["social", "links"], callback: buildLambda("social"), path: "/social" },
		{ aliases: ["research", "portfolio", "projects", "work", "past work", "publications", "publication"], callback: buildLambda("portfolio"), path: "/research" },
		{ aliases: ["supervision", "supervise", "mentoring", "mentor", "mentorship", "fellowship", "fellowships", "collaboration", "collaborate"], callback: buildLambda("supervision"), path: "/supervision" },
		{ aliases: ["contact"], callback: buildLambda("contact"), path: "/contact" },
		{ aliases: ["pgp", "publickey", "public key"], callback: buildLambda("pgp"), path: "/pgp" },
		{ aliases: ["clear", "cls"], callback: function() { jqconsole.Clear(); return introOutput(); }, path: "/" },
		{ aliases: ["cats", "cat", "meow", "miao"], callback: function() {
			return renderCat(jqconsole.$console[0]);
		}}
	];

	var introOutput = () => {
		return prompts['unformatted_intro'].trim() + "\n\n";
	};

	var writeOutput = (content) => {
		var output = jqconsole.Write("<span class='wrapper'>" + content + "</span>", "jqconsole-output", false);
		initializePublications(output[0]);
		output.find('.cat-credits').on('mouseup click', function(event) {
			event.stopPropagation();
		});
	};

	var findCommand = (input) => {
		var parsed = input.split(" ");
		return commands.find(function(command) {
			return command.aliases.some(function(term) {
				return term === parsed[0] || term === input;
			});
		});
	};

	var process = (input) => {
		var parsed = input.split(" ");
		var command = findCommand(input);
		if (command) {
			return command.callback();
		} else {
			var commands_list = [];
			commands.forEach(function(command) {
				command.aliases.forEach(function(term) {
					commands_list.push({
						"command": term,
						"callback": command.callback
					});
				});
			});
			var results = search(commands_list, parsed[0]);
			if (results.length > 0) {
				response = "\nThat command doesn't exist. Did you mean ";
				results.forEach(function(result, index) {
					if (index === results.length - 1 && results.length == 2) {
						response = response.substring(0, response.length - 2);
						response += " or " + buildSpecialText(result["item"]["command"]) + ", ";
					} else if (index === results.length - 1 && results.length > 1) {
						response = response.substring(0, response.length - 2);
						response += ", or " + buildSpecialText(result["item"]["command"]) + ", ";
					} else {
						response += buildSpecialText(result["item"]["command"]) + ", ";
					}
				});
				response = response.substring(0, response.length - 2);
				response += "?\n\n";
				return response;
			} else {
				return "\nThat command doesn't exist. Here is a list of commands you can use:\n" + format("help");
			}
		}
	};

	var updatePath = (input) => {
		var command = findCommand(input);
		if (command && command.path && window.location.pathname !== command.path) {
			window.history.pushState({}, "", command.path);
		}
	};

	var processQuery = (input) => {
		if (input) {
			var trimmed = input.toLowerCase().trim();
			var matchedCommand = findCommand(trimmed);
			followPrompt = !matchedCommand || matchedCommand.path !== "/research";
			writeOutput(process(trimmed));
			updatePath(trimmed);
			if (matchedCommand && typeof gtag === "function") {
				gtag("event", "terminal_command", {
					command_path: matchedCommand.path || "/other"
				});
			}
		} else {
			followPrompt = true;
			writeOutput("\nHere is a list of commands:\n" + format("help"));
		}
		startPrompt();
	};

	var startPrompt = () => {
		jqconsole.Prompt(true, processQuery);
	};

	var commandForPath = (path) => {
		var normalizedPath = path.replace(/\/+$/, "") || "/";
		return routes[normalizedPath];
	};

	var renderPath = (path) => {
		var command = commandForPath(path);
		followPrompt = command !== "research";
		writeOutput(introOutput());
		if (command) {
			jqconsole.Write("kwei> " + command + "\n", "jqconsole-old-prompt", false);
			writeOutput(process(command));
		}
	};

	window.addEventListener("popstate", function() {
		followPrompt = commandForPath(window.location.pathname) !== "research";
		jqconsole.AbortPrompt();
		jqconsole.Clear();
		renderPath(window.location.pathname);
		startPrompt();
	});

	renderPath(window.location.pathname);
	startPrompt();
});
