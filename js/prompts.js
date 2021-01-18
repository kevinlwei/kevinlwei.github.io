/*
Commands:

help: display a list of available commands
hello: display introduction message again
links: display a list of relevant links
contact: display contact info
cats: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `Right now, I'm the Digital Director for NYS Assemblymember <a href="https://danquart.com/" target="_blank">Dan Quart</a>'s campaign for Manhattan District Attorney in 2021. I'm also a Code for Equity Fellow with <a href="https://www.impactlabs.io/fellowship" target="_blank">Impact Labs</a>, a Trainer (Digital) for the <a href="https://traindemocrats.org/" target="_blank">National Democratic Training Committee</a>, and the Startups Manager for <a href="https://digitalocean.com" target="_blank">DigitalOcean</a>, where I'm scaling out our education access and startup programs. Check out <a href="https://www.digitalocean.com/the-spin-up/" target="_blank">the Spin Up</a>, DigitalOcean and a16z's new program to expand computer science education to historically underrepresented communities! 
\t
\tAdditionally, I serve on the National Endorsements Board of the <a href="https://victoryfund.org/" target="_blank">LGBTQ+ Victory Fund</a>, the New York State Assembly'e Asian American & Pacific Islander Task Force Advisory Board, the Young Voter Advisory Board of civictech startup <a href="https://motivote.us/" target="_blank">Motivote</a>, and the <a href="https://myd.nyc" target="_blank">Manhattan Young Democrats</a> Executive Board (where I'm also a political director).
\t 
\tPreviously, I was a <a href="https://fiveboroughfuture.com/fellows" target="_blank">Five Borough Future Fellow</a> with the Arena PAC, a Fellow at the <a href="https://www.neted.org/" target="_blank">Internet Education Foundation</a>, an organizer with the AAPI Victory Fund, and a 2018 Beto Senate campaign staffer. When time permits, I'm an avid Overwatch player and science fiction fan (reviewer at <a href="http://www.fantasyliterature.com/" target="_blank">FantasyLiterature.com</a>). Formerly Math-Stat + Economics @ Columbia, now CS grad student @ Georgia Tech (OMSCS). 
\t 
\t To learn more about me, type <span class="special">social</span> to find me around the interwebs, <span class="special">portfolio</span> to see my past work, or <span class="special">contact</span> to reach out to me.`;

var unformatted_intro = `Hey there! I'm <span class="special" >Kevin Wei</span>: <span class="special">digital strategist</span>, <span class="special">policy advocate</span>, and <span class="special">data scientist</span> based in NYC. I work on political campaigns (focused on NYC 2021), as well as advocacy on education, economic + racial equity, tech policy, and LGBTQ+ rights. Currently the Digital Director for <a href="https://danquart.com/" target="_blank">Assemblymember Dan Quart</a>. Shoot me a message at hi@kevinlwei.com :)
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

var social = `<a href="https://twitter.com/kevinlwei" target="_blank">Twitter</a>
\t<a href="https://www.linkedin.com/in/kevinlwei/" target="_blank">LinkedIn</a>
\t 
\t Type <span class = "special">help</span> for more commands.`;

var portfolio = `Here's a few of my past projects:
\t
\t<a href="https://www.dayoneproject.org/post/creating-transparency-and-fairness-in-automated-decision-systems-for-administrative-agencies" target="_blank">Creating Transparency and Fairness in Automated Decision Systems for Administrative Agencies</a>: my latest white paper on regulating MLAI bias, published by the Day One Project (a project of the Federation of American Scientists)
\t<a href="https://www.digitalocean.com/blog/how-startups-can-overcome-obstacles-in-their-cloud" target="_blank">How startups can overcome obstacles in their cloud journey</a>: a DigitalOcean blog post on some recent startup research we conducted
\t<a href="https://dumplingsagainsthate.com" target="_blank">Dumpings Against Hate</a>: a digital media campaign that's raised $63,000+ to date for relief for NYC Chinatowns' small businesses during COVID-19
\t<a href="https://planamag.com/only-one-candidate-will-protect-flushing-and-its-not-the-dishonest-cop-backed-by-luxury-real-estate/" target="_blank">Only one candidate will protect flushing, and it's not the dishonest cop backed by luxury real estate</a>: an op-ed in Plan A Magazine
\t<a href="https://www.fcc.gov/ecfs/filing/10717079873938" target="_blank">Net Neutrality Comment</a> (2017): here's internet infrastructure startup DigitalOcean's comment to the FCC in support of net neutrality, which I wrote back in 2017
\t<a href="http://www.fantasyliterature.com/author-interviews/n-k-jemisin/" target="_blank">N.K. Jemisin Interview</a> (2016): here's me interviewing NYT-bestselling fantasy author N.K. Jemisin about her Broken Earth trilogy
\t 
\tYou can also read about my advocacy work in the press:
\t
\t<a href="https://www.businessinsider.com/democrats-door-knock-campaign-election-republicans-biden-voters-2020-12" target="_blank">Democrats' decision to avoid in-person events with voters cost them in 2020. But it could set them up for bigger wins in the long run.</a>, <em>Business Insider</em>
\t<a href=https://nypost.com/2020/06/10/youth-programs-say-de-blasios-plan-to-use-nypd-funds-is-nonsense/"" target="_blank">Youth programs say de Blasio plan to reallocate NYPD funds is nonsense </a>, <em>New York Post,</em>
\t<a href="https://www.columbiaspectator.com/news/2020/05/03/new-york-city-cancels-its-summer-program-that-employs-75000-youths/" target="_blank">New York City cancels its summer program that employs 75,000 youths </a>, <em>Columbia Spectator</em>
\t<a href="https://citylimits.org/2020/04/28/in-fight-to-save-summer-youth-employment-advocates-push-city-to-let-teens-work-remotely/" target="_blank">In Fight to Save Summer Youth Employment, Advocates Push City to Let Teens Work Remotely</a>, <em>City Limits</em>
\t<a href="https://www.wsj.com/articles/new-yorks-chinatown-businesses-struggle-to-survive-coronavirus-shutdown-11588856400" target="_blank">New York’s Chinatown Businesses Struggle to Survive Coronavirus Shutdown </a>, <em>Wall Street Journal</em>
\t<a href="https://gothamist.com/food/dumplings-against-hate-want-you-to-show-some-love-to-nycs-chinatowns" target="_blank">“Dumplings Against Hate” Want You To Show Some Love To NYC's Chinatowns</a>, <em>Gothamist</em>
\t Type <span class = "special">help</span> for more commands.`;

var contact = `Feel free to reach out at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a>. I'm always down to grab some #covfefe, collaborate on projects, or provide feedback on what you're working on.
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
