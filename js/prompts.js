/*
Commands:

help: display a list of available commands
hello: display introduction message again
links: display a list of relevant links
contact: display contact info
cats: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `Right now, I'm a Technology and Security Policy Fellow at RAND and a first-year at Harvard Law School. I'm also a trainer (digital) for the <a href="https://traindemocrats.org/" target="_blank">National Democratic Training Committee</a> and serve on the national endorsements board of the <a href="https://victoryfund.org/" target="_blank">LGBTQ+ Victory Fund</a>.
\t 
\tPreviously, I have been a <a href="https://www.schwarzmanscholars.org/" target="_blank">Schwarzman Scholar</a> in Beijing (where I researched China's sub-national AI governance initiatives), a Summer Fellow at the <a href="https://www.governance.ai/" target="_blank">Centre for the Governance of AI</a>, a Senior Marketing Manager at cloud infrastructure provider <a href="https://digitalocean.com" target="_blank">DigitalOcean</a>, a <a href="https://fiveboroughfuture.com/fellows" target="_blank">Five Borough Future Fellow</a> with the Arena PAC for my political work in NYC, a member of the Organizing Committee of the <a href="https://techaction.nyc/" target="_blank">NYC-DSA Tech Action Working Group</a>, a Fellow at the <a href="https://www.neted.org/" target="_blank">Internet Education Foundation</a>, an organizer with the AAPI Victory Fund, and a 2018 Beto Senate campaign staffer. Formerly Math-Stat + Economics @ Columbia and OMSCS @ Georgia Tech. 
\t 
\t To learn more about me, type <span class="special">social</span> to find me around the interwebs, <span class="special">portfolio</span> to see my past work, or <span class="special">contact</span> to reach out to me.`;

var unformatted_intro = `Hey there! I'm <span class="special" >Kevin Wei</span>: a <span class="special">policy researcher</span> and <span class="special">technologist</span> based in Boston. I'm interested in (the intersection of) AI governance in the U.S. and China, administrative law & regulation, and quantitative social science. Currently a Technology and Security Policy Fellow at RAND and a first-year at Harvard Law. Feel free to grab some time on my <a href="https://calendar.app.google/ocDjMUN1AGJof99k9" target="_blank">calendar</a> or drop me a message at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a> :)
\t
Type <span class="special">hello</span> below to learn more about me, or try <span class="special">?</span> or <span class="special">help</span> to see more commands.`;

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
  name: buildSpecialText("portfolio"),
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
\t> <a href="https://www.governance.ai/research-paper/open-sourcing-highly-capable-foundation-models" target="_blank">Open Sourcing Highly Capable Foundation Models</a> (Co-author; 2023)
\t> <a href="https://cset.georgetown.edu/publication/china-explainable-ai-projects/" target="_blank">Translation: Notice on the Release of [China's] “Guide to the 2023 Annual Projects for the Major Research Program on Explainable and Generalizable Next-Generation Artificial Intelligence Methods”</a> (2023)
\t> <a href="https://cset.georgetown.edu/publication/ai-pilot-zone-guidelines-revised-2020/" target="_blank">Translation: Notice of the [Chinese] Ministry of Science and Technology on the Publication of the Guidelines for National New Generation Artificial Intelligence Innovation and Development Pilot Zone Construction Work (Revised Version)</a> (2023)
\t> <a href="https://www.dayoneproject.org/post/creating-transparency-and-fairness-in-automated-decision-systems-for-administrative-agencies" target="_blank">Creating Transparency and Fairness in Automated Decision Systems for Administrative Agencies</a> (2020)
\t 
\tYou can also read about my past advocacy work in the press:
\t
\t> <a href="https://www.businessinsider.com/democrats-door-knock-campaign-election-republicans-biden-voters-2020-12" target="_blank">Democrats' decision to avoid in-person events with voters cost them in 2020. But it could set them up for bigger wins in the long run.</a>, <em>Business Insider</em>
\t> <a href=https://nypost.com/2020/06/10/youth-programs-say-de-blasios-plan-to-use-nypd-funds-is-nonsense/"" target="_blank">Youth programs say de Blasio plan to reallocate NYPD funds is nonsense</a>, <em>New York Post,</em>
\t> <a href="https://www.columbiaspectator.com/news/2020/05/03/new-york-city-cancels-its-summer-program-that-employs-75000-youths/" target="_blank">New York City cancels its summer program that employs 75,000 youths</a>, <em>Columbia Spectator</em>
\t> <a href="https://citylimits.org/2020/04/28/in-fight-to-save-summer-youth-employment-advocates-push-city-to-let-teens-work-remotely/" target="_blank">In Fight to Save Summer Youth Employment, Advocates Push City to Let Teens Work Remotely</a>, <em>City Limits</em>
\t> <a href="https://www.wsj.com/articles/new-yorks-chinatown-businesses-struggle-to-survive-coronavirus-shutdown-11588856400" target="_blank">New York’s Chinatown Businesses Struggle to Survive Coronavirus Shutdown</a>, <em>Wall Street Journal</em>
\t> <a href="https://gothamist.com/food/dumplings-against-hate-want-you-to-show-some-love-to-nycs-chinatowns" target="_blank">“Dumplings Against Hate” Want You To Show Some Love To NYC's Chinatowns</a>, <em>Gothamist</em>
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
