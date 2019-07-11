/*
Commands:

help: display a list of available commands
hello: display introduction message again
links: display a list of relevant links
contact: display contact info
cats: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `I'm a <span class="special">political organizer</span> and <span class="special">policy researcher</span> with a technical background. My main policy interests are economic inequality, technology regulation and innovation policy, and select microeconomics topics. Right now I'm an Associate at <a href="https://digitalocean.com" target="_blank">DigitalOcean</a>, where I work on education equity and diversity.
\t 
\tIn the past, I was a 2019 State of the Net Fellow at the <a href="https://www.neted.org/" target="_blank">Internet Education Foundation</a> and a Beto Senate campaign staffer. I've also worked/interned in the Office of Nancy Pelosi, the <a href="https://www.cfr.org/" target="_blank">Council of Foreign Relations</a>, the <a href="http://www.techstars.com/programs/" target="_blank">Techstars IoT Accelerator</a>, the <a href="https://www.georgewbushlibrary.smu.edu/" target="_blank">George W. Bush Presidential Library</a>, and the <a href="https://www.si.edu/" target="_blank">Smithsonian</a>. When time permits, I'm an avid Overwatch player (TeSPA) and science fiction fan (reviewer at <a href="http://www.fantasyliterature.com/" target="_blank">FantasyLiterature.com</a>). Recent graduate of Columbia, where I studied Mathematics-Statistics & Economics with some IR/politics.
\t 
\t To learn more about me, type <span class="special">social</span> to find me around the web, <span class="special">portfolio</span> to see my past work, or <span class="special">contact</span> to reach out to me.`;

var unformatted_intro = `Hey there! My name is <span class="special" >Kevin Wei</span>. I'm a <span class="special">political organizer</span>, <span class="special">activist</span>, and <span class="special">policy researcher</span> working on education equity, technology policy, LGBTQ+ equality, and other key issues. Proudly based in NYC!
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

var social = `<a href="https://www.linkedin.com/in/kevinlwei/" target="_blank">LinkedIn</a>
\t<a href="https://twitter.com/kevinlwei" target="_blank">Twitter</a>
\t<a href="https://angel.co/kevinwei" target="_blank">AngelList</a>
\t 
\t Type <span class = "special">help</span> for more commands.`;

var portfolio = `<a href="https://www.fcc.gov/ecfs/filing/10717079873938" target="_blank">Net Neutrality Comment</a> (2017): here's internet infrastructure startup DigitalOcean's comment to the FCC in support of net neutrality, which I wrote back in 2017
\t<a href="https://fbnewsroomus.files.wordpress.com/2019/06/oversight-board-consultation-report-appendix.pdf" target="_blank">Facebook Global Oversight Board Comment</a> (2019): here's my personal comment to Facebook on their proposed structure for a "Supreme Court" of content moderation (pgs. 36-37)
\t<a href="http://www.fantasyliterature.com/author-interviews/n-k-jemisin/" target="_blank">N.K. Jemisin Interview</a> (2016): here's me interviewing NYT-bestselling fantasy author N.K. Jemisin about her Broken Earth trilogy
\t<a href="https://impulse.coreatcu.com/libretaxi-an-uber-for-rural-disadvantaged-communities-657269849d31" target="_blank">The Story of LibreTaxi</a> (2017): here's me writing about LibreTaxi, a non-profit ride-sharing app aimed at rural users
\t<a href="https://medium.com/@kevinwei" target="_blank">Medium</a>: my writing, mostly for Columbia's tech- & startup-focused Core Impulse magazine
\t<a href="https://github.com/kevinlwei" target="_blank">GitHub</a>: my code snippets :)
\t 
\t Type <span class = "special">help</span> for more commands.`;

var contact = `Feel free to reach out at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a>. I'm always down to grab some #covfefe, collaborate on projects, or provide feedback on what you're working on
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
