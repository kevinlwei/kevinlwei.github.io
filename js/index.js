$(document).ready(function() {
	var jqconsole = $("#console").jqconsole("", "kwei> ");
  jqconsole.Write("<span class='wrapper'>" + prompts['unformatted_intro'] + '\n\n</span>', 'jqconsole-output', false);

	var process = (input) => {
		var parsed = input.split(" ");
		var commands = [
			[["help", "?", "ls", "commands"], buildLambda("help")],
			[["hello", "kevin", "kwei", "hi", "mission", "description", "why", "intro", "info", "about"], buildLambda("intro")],
			[["social", "links"], buildLambda("social")],
			[["research", "portfolio", "projects", "work", "past work", "publications", "publication"], buildLambda("portfolio")],
			[["contact"], buildLambda("contact")],
			[["pgp", "publickey", "public key"], buildLambda("pgp")],
			[["clear", "cls"], function() { jqconsole.Clear(); return "<span class='wrapper'>" + prompts['unformatted_intro'] + '\n\n</span>'; }],
			[["cats", "cat", "meow"], function() {
				return '\n' + prompts['cats'][Math.floor(Math.random()*prompts['cats'].length)] + '\n\n';
			}]
		];
		var response = null;
		commands.forEach(function(key, index, commands) {
			key[0].forEach(function(term, tindex) {
				if (term === parsed[0] || term === input) {
					response = key[1]();
				}
			});
		});
		if (response) {
			return response;
		} else {
			var commands_list = [];
			commands.forEach(function(key, index, commands) {
				key[0].forEach(function(term, tindex) {
					commands_list.push({
						"command": term,
						"callback": key[1]
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

	var processQuery = (input) => {
		if (input) {
			var trimmed = input.toLowerCase().trim();
			jqconsole.Write(process(trimmed), "jqconsole-output", false);
			gtag('event', 'command', { command: trimmed });
		} else {
			jqconsole.Write("\n Here is a list of commands:\n" + format("help"), "jqconsole-output", false);
		}
		startPrompt();
	};

	var startPrompt = () => {
		jqconsole.Prompt(true, processQuery);
	};

	var urlParams = new URLSearchParams(window.location.search);
	var cmd = urlParams.get('cmd');
	if (cmd) {
		window.history.replaceState(null, '', '/' + encodeURIComponent(cmd));
		gtag('event', 'page_view', { page_path: '/' + cmd });
		jqconsole.Write(process(cmd.toLowerCase().trim()), 'jqconsole-output', false);
	}

	startPrompt();
});
