/*
Commands:

help: display a list of available commands
hello: display introduction message again
links: display a list of relevant links
contact: display contact info
cats: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `Right now, I'm a Technology and Security Policy Fellow at RAND and a second year at Harvard Law School.
\t 
\tPreviously, I have been a <a href="https://www.schwarzmanscholars.org/" target="_blank">Schwarzman Scholar</a> in Beijing (where I researched China's sub-national AI governance initiatives), a Summer Fellow at the <a href="https://www.governance.ai/" target="_blank">Centre for the Governance of AI</a>, and a Senior Marketing Manager at cloud infrastructure provider <a href="https://digitalocean.com" target="_blank">DigitalOcean</a>. I did my M.S. in machine learning @ Georgia Tech and my undergrad in Math-Stat + Economics @ Columbia. 
\t 
\t To learn more about me, type <span class="special">social</span> to find me around the interwebs, <span class="special">research</span> to see my past work, or <span class="special">contact</span> to reach out.`;

var unformatted_intro = `Hey there! I'm <span class="special" >Kevin Wei</span>: an <span class="special">AI policy researcher</span> based in Boston. I work on AI incidents, institutional design, and empirical research in AI governance; I'm also thinking about (socio)technical AI governance problems. Currently a Technology and Security Policy Fellow at RAND and a second year at Harvard Law. Feel free to grab some time on my <a href="https://cal.com/kevinwei/15min" target="_blank">calendar</a> or drop me a message at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a> :)
\t
Type <span class="special">hello</span> below to learn more about me, <span class="special">research</span> for some past work, or try <span class="special">?</span> or <span class="special">help</span> to see more commands.`;

var help = [{
  name: buildSpecialText("help"),
  description: "Display all commands"
}, {
  name: buildSpecialText("hello"),
  description: "Display introduction message"
}, {
  name: buildSpecialText("social"),
  description: "Displays links to social media"
}, {
  name: buildSpecialText("research"),
  description: "Displays links to my past work"
}, {
  name: buildSpecialText("contact"),
  description: "Display my contact info"
}, {
  name: buildSpecialText("cats"),
  description: "Display ASCII art of cats"
}, {
  name: buildSpecialText("cls"),
  description: "Clear the screen"
}];

var social = ` > <a href="https://www.linkedin.com/in/kevinlwei/" target="_blank">Linkedin</a>
\t> <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank">Google Scholar</a>
\t> <a href="https://twitter.com/kevinlwei" target="_blank">Twitter</a>
\t> <a rel="me" href="https://mastodon.social/@kwei" target="_blank">Mastodon</a>
\t
\t Type <span class = "special">help</span> for more commands.`;

var portfolio = `Here are my recent publications:
\t
\t> How Do AI Companies "Fine-Tune" Policy? Examining Regulatory Capture in AI Governance  (First author; forthcoming @ AIES 2024)
\t> Designing Incident Reporting Systems for Harms from AI (First author; forthcoming)
\t> <a href="https://arxiv.org/abs/2401.13138" target="_blank">Visibility into AI Agents</a> (Co-author; FAccT 2024)
\t> <a href="https://arxiv.org/abs/2401.14446" target="_blank">Black-Box Access is Insufficient for Rigorous AI Audits</a> (Co-author; FAccT 2024)
\t> <a href="https://arxiv.org/abs/2311.09227" target="_blank">Open Sourcing Highly Capable Foundation Models</a> (Co-author; 2023)
\t> <a href="https://cset.georgetown.edu/publication/china-explainable-ai-projects/" target="_blank">Translation: Notice on the Release of [China's] “Guide to the 2023 Annual Projects for the Major Research Program on Explainable and Generalizable Next-Generation Artificial Intelligence Methods”</a> (Translator; CSET 2023)
\t> <a href="https://cset.georgetown.edu/publication/ai-pilot-zone-guidelines-revised-2020/" target="_blank">Translation: Notice of the [Chinese] Ministry of Science and Technology on the Publication of the Guidelines for National New Generation Artificial Intelligence Innovation and Development Pilot Zone Construction Work (Revised Version)</a> (Translator; CSET 2023)
\t> <a href="https://www.dayoneproject.org/post/creating-transparency-and-fairness-in-automated-decision-systems-for-administrative-agencies" target="_blank">Creating Transparency and Fairness in Automated Decision Systems for Administrative Agencies</a> (Federation of American Scientists 2020)
\t 

\t Type <span class = "special">help</span> for more commands.`;

var contact = `Feel free to reach out at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a>, or just directly schedule some time on my <a href="https://calendar.app.google/ocDjMUN1AGJof99k9" target="_blank">calendar</a>. I'm always down to grab some #covfefe, collaborate on projects, or provide feedback on what you're working on.
\t 
\t Type <span class = "special">help</span> for more commands.`;

var cats = [
"            _,'|             _.-''``-...___..--';)\n" +
"           /_ \\'.      __..-' ,      ,--...--'''\n" +
"          <\\    .`--'''       `     /'\n" +
"           `-';'               ;   ; ;\n" +
"     __...--''     ___...--_..'  .;.'\n" +
"    (,__....----'''       (,..--'",
"              __..--''``---....___   _..._    __\n" +
"    /// //_.-'    .-/'';  `        ``<._  ``.''_ `. / // /\n" +
"   ///_.-' _..--.'_    \\                    `( ) ) // //\n" +
"   / (_..-' // (< _     ;_..__               ; `' / ///\n" +
"    / // // //  `-._,_)' // / ``--...____..-' /// / //",
"                      /^--^\\     /^--^\\     /^--^\\\n" +
"                      \\____/     \\____/     \\____/\n" +
"                     /      \\   /      \\   /      \\\n" +
"                    |        | |        | |        |\n" +
"                     \\__  __/   \\__  __/   \\__  __/\n" +
"|^|^|^|^|^|^|^|^|^|^|^|^\\ \\^|^|^|^/ /^|^|^|^|^\\ \\^|^|^|^|^|^|^|^|^|^|^|^|\n" +
"| | | | | | | | | | | | |\\ \\| | |/ /| | | | | | \\ \\ | | | | | | | | | | |\n" +
"########################/ /######\\ \\###########/ /#######################\n" +
"| | | | | | | | | | | | \\/| | | | \\/| | | | | |\\/ | | | | | | | | | | | |\n" +
"|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_",
"             *     ,MMM8&&&.            *\n" +
"                  MMMM88&&&&&    .\n" +
"                 MMMM88&&&&&&&\n" +
"     *           MMM88&&&&&&&&\n" +
"                 MMM88&&&&&&&&\n" +
"                 'MMM88&&&&&&'\n" +
"                   'MMM8&&&'      *\n" +
"          |\\___/|\n" +
"         =) ^Y^ (=            .              '\n" +
"          \\  ^  /\n" +
"           )=*=(       *\n" +
"          /     \\\n" +
"          |     |\n" +
"         /| | | |\\\n" +
"         \\| | |_|/\\\n" +
"  jgs_/\\_//_// ___/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_\n" +
"  |  |  |  | \\_) |  |  |  |  |  |  |  |  |  |\n" +
"  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n" +
"  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n" +
"  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n" +
"  |  |  |  |  |  |  |  |  |  |  |  |  |  |  ",
"                _                       \n" +
"                \\`*-.                   \n" +
"                 )  _`-.                \n" +
"                .  : `. .               \n" +
"                : _   '  \\              \n" +
"                ; *` _.   `*-._         \n" +
"                `-.-'          `-.      \n" +
"                  ;       `       `.    \n" +
"                  :.       .        \\   \n" +
"                  . \\  .   :   .-'   .  \n" +
"                  '  `+.;  ;  '      :  \n" +
"                  :  '  |    ;       ;-.\n" +
"                  ; '   : :`-:     _.`* ;\n" +
"         [bug] .*' /  .*' ; .*`- +'  `*'\n" +
"               `*-*   `*-*  `*-*'       ",
"                       ;\\\n" +
"                      _' \\_\n" +
"                    ,' '  '`.\n" +
"                   ;,)       \\\n" +
"                  /          :\n" +
"                  (_         :\n" +
"                   `--.       \\\n" +
"                      /        `.\n" +
"                     ;           `.\n" +
"                    /              `.\n" +
"                   :                 `.\n" +
"                   :                   \\\n" +
"                    \\\\                  \\\n" +
"                     ::                 :\n" +
"                     || |               |\n" +
"                     || |`._            ;\n" +
"                    _;; ; __`._,       (________\n" +
"                  ((__/(_____(______,'______(___) SSt",
"                               __\n" +
"                         _,-;''';`'-,.\n" +
"                      _/',  `;  `;    `\\\n" +
"      ,        _..,-''    '   `  `      `\\\n" +
"     | ;._.,,-' .| |,_        ,,          `\\\n" +
"     | `;'      ;' ;, `,   ; |    '  '  .   \\\n" +
"     `; __`  ,'__  ` ,  ` ;  |      ;        \\\n" +
"     ; (6_);  (6_) ; |   ,    \\        '      |       /\n" +
"    ;;   _,' ,.    ` `,   '    `-._           |   __//_________\n" +
"     ,;.=..`_..=.,' -'          ,''        _,--''------''''\n" +
"_pb__\\,`''=,,,==''',___,,,-----'''----'_'_'_''-;''\n" +
"-----------------------''''''\\ \\'''''   )   /'\n" +
"                              `\\`,,,___/__/'_____,\n" +
"                                `--,,,--,-,'''\\\n" +
"                               __,,-' /'       `\n" +
"                             /'_,,--''\n" +
"                            | (\n" +
"                             `'",
"                                     ,\n" +
"              ,-.       _,---._ __  / \\\n" +
"             /  )    .-'       `./ /   \\\n" +
"            (  (   ,'            `/    /|\n" +
"             \\  `-''             \\'\\   / |\n" +
"              `.              ,  \\ \\ /  |\n" +
"               /`.          ,'-`----Y   |\n" +
"              (            ;        |   '\n" +
"              |  ,-.    ,-'         |  /\n" +
"              |  | (   |        hjw | /\n" +
"              )  |  \\  `.___________|/\n" +
"              `--'   `--'"
];

var invalid = `That's not a valid command! Type <span class='special'>help</span> for a list of commands.`;

var prompts = {
	help: help,
  unformatted_intro: unformatted_intro,
  intro: intro,
  social: social,
  portfolio: portfolio,
  contact: contact,
  cats: cats,
	invalid: invalid
};
