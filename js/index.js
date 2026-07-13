$(document).ready(function() {
	var jqconsole = $("#console").jqconsole("", "kwei> ");
	var commands = [
		{ aliases: ["help", "?", "ls", "commands"], callback: buildLambda("help"), path: "/help" },
		{ aliases: ["hello", "kevin", "kwei", "hi", "mission", "description", "why", "intro", "info", "about"], callback: buildLambda("intro"), path: "/about" },
		{ aliases: ["social", "links"], callback: buildLambda("social"), path: "/social" },
		{ aliases: ["research", "portfolio", "projects", "work", "past work", "publications", "publication"], callback: buildLambda("portfolio"), path: "/research" },
		{ aliases: ["contact"], callback: buildLambda("contact"), path: "/contact" },
		{ aliases: ["pgp", "publickey", "public key"], callback: buildLambda("pgp"), path: "/pgp" },
		{ aliases: ["clear", "cls"], callback: function() { jqconsole.Clear(); return introOutput(); }, path: "/" },
		{ aliases: ["cats", "cat", "meow"], callback: function() {
			return '\n' + prompts['cats'][Math.floor(Math.random()*prompts['cats'].length)] + '\n\n';
		}}
	];

	var routes = {
		"/about": "about",
		"/contact": "contact",
		"/help": "help",
		"/pgp": "pgp",
		"/research": "research",
		"/social": "social"
	};

	var introOutput = () => {
		return "<span class='wrapper'>" + prompts['unformatted_intro'] + '\n\n</span>';
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
			jqconsole.Write(process(trimmed), "jqconsole-output", false);
			updatePath(trimmed);
			gtag('event', 'command', { command: trimmed });
		} else {
			jqconsole.Write("\n Here is a list of commands:\n" + format("help"), "jqconsole-output", false);
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
		jqconsole.Write(introOutput(), "jqconsole-output", false);
		if (command) {
			jqconsole.Write("kwei> " + command + "\n", "jqconsole-old-prompt", false);
			jqconsole.Write(process(command), "jqconsole-output", false);
		}
	};

	window.addEventListener("popstate", function() {
		jqconsole.AbortPrompt();
		jqconsole.Clear();
		renderPath(window.location.pathname);
		startPrompt();
	});

	renderPath(window.location.pathname);
	startPrompt();
});
