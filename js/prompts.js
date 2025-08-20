/*
Commands:

help: display a list of available commands
hello: display introduction message again
links: display a list of relevant links
contact: display contact info
cats: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `Right now, I'm <a href="https://www.rand.org/about/people/w/wei_kevin.html" target="_blank">Fellow</a> in RAND's Technology & Security Policy Center (TASP) and a third year J.D. candidate at Harvard Law School. I'm also a <a href="https://www.salzburgglobal.org/" target="_blank">Salzburg Global Fellow</a>, the 2025–26 Submissions Editor of the <a href="https://jolt.law.harvard.edu" target="_blank">Harvard Journal of Law and Technology</a>, a co-founder of the Harvard Law AI Student Association, a Working Group Chair of the <a href="https://evaleval.github.io/" target="_blank">Evaluating Evaluations Coalition</a> (EvalEval), and an honoree of New America & Out in National Security's <a href="https://www.outinnationalsecurity.org/honor-roll/2024-new-voices/" target="_blank">2024 New Voices List</a>. Despite academic peer review being somewhat broken, I currently review for NeurIPS, AIES, SoLaR, TAIG-ICML, and other venues.
\t 
\tPreviously, I was <a href="https://www.schwarzmanscholars.org/" target="_blank">Schwarzman Scholar</a> in Beijing (where I researched Chinese AI policy), a Summer Fellow at the <a href="https://www.governance.ai/" target="_blank">Centre for the Governance of AI</a>, and a Senior Marketing Manager at cloud infrastructure provider <a href="https://digitalocean.com" target="_blank">DigitalOcean</a>. When I was more active in politics, I helped co-found <a href="https://www.gofundme.com/f/savenycchinatown-dumplings-against-hate" target="_blank">Dumplings Against Hate</a>, a COVID-19 project that helped raised over $65,000 for charity to support small businesses in New York City's Chinatowns; I also used to serve on the <a href="https://victoryfund.org/about/victory-campaign-board/" target="_blank">LGBTQ+ Victory Fund</a>'s political endorsements board.
\t
\tI have a Master's in Global Affairs from Tsinghua University, an M.S. in Machine Learning from Georgia Tech, and a B.A. in Mathematics-Statistics & Economics from Columbia. I was also a member of the fifth cohort of the <a href="https://www.arena.education/" target="_blank">Alignment Research Engineer Accelerator</a>.
\t
\tOccasionally I have some free time, in which I play classical piano, run, enjoy desserts, and read speculative fiction.
\t
\t To learn more about me, type <span class="special">social</span> to find me around the interwebs, <span class="special">research</span> to see my past work, or <span class="special">contact</span> to reach out.`;

var unformatted_intro = `Hey there! I'm <span class="special">Kevin Wei</span>: currently a <span class="special">Fellow in RAND's Technology & Security Policy Center</span> (TASP) and a third year J.D. candidate at Harvard Law, where I'm the <span class="special">Submissions Editor of the Harvard Journal of Law & Technology</span>. My research agenda is focused on the science of AI evaluations (evaluation methodology), U.S. AI policy, and technical AI governance; I work on AI safety, governance, and ethics because I believe that artificial (general) intelligence will be one of the most transformative technologies in my lifetime. 
\t
\tFeel free to grab some time on my <a href="https://cal.com/kevinwei/15min" target="_blank">calendar</a> or drop me a message at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a> :)
\t
To learn more about me, type <span class="special">about</span>, <span class="special">research</span>, or <span class="special">?</span> or <span class="special">help</span> to see more commands.`;

var help = [{
  name: buildSpecialText("help"),
  description: "Display all commands"
}, {
  name: buildSpecialText("about"),
  description: "Display full bio"
}, {
  name: buildSpecialText("social"),
  description: "Display links to social media"
}, {
  name: buildSpecialText("research"),
  description: "Display links to my past work"
}, {
  name: buildSpecialText("contact"),
  description: "Display my contact info"
}, {
  name: buildSpecialText("meow"),
  description: "Display ASCII art of cats"
}, {
  name: buildSpecialText("cls"),
  description: "Clear the screen"
}];

var social = ` > <a href="https://www.linkedin.com/in/kevinlwei/" target="_blank">Linkedin</a>
\t> <a href="https://twitter.com/kevinlwei" target="_blank">Twitter</a>
\t> <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank">Google Scholar</a>
\t
\t Type <span class = "special">help</span> for more commands.`;

var portfolio = `Check <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank">Google Scholar</a> for an updated list of publications; some recent work is below:
\t
\t> Position: Human Baselines in Model Evaluations Need Rigor and Transparency (With Recommendations & Reporting Checklist) (First author; <a href="https://arxiv.org/abs/2506.13776" target="_blank">ICML 2025 Spotlight</a>)
\t> Methodological Challenges in Agentic Evaluations of AI Systems (First author; <a href="https://openreview.net/forum?id=ZhSKG8IslC" target="_blank">ICML 2025 Technical AI Governance Workshop</a>)
\t> Local US officials' views on the impacts and governance of AI: Evidence from 2022 and 2023 survey waves (Co-first author; <a href="https://arxiv.org/abs/2501.09606" target="_blank">preprint under review 2025</a>)
\t> Infrastructure for AI Agents (Second author; <a href="https://arxiv.org/abs/2501.10114" target="_blank">TMLR 2025</a>)
\t> The AI Agent Index (Co-author; <a href="https://arxiv.org/abs/2502.01635" target="_blank">preprint 2025</a>)
\t> Designing Incident Reporting Systems for Harms from General-Purpose AI (First author; forthcoming 2025)
\t> How Do AI Companies "Fine-Tune" Policy? Examining Regulatory Capture in AI Governance? (First author; <a href="https://dx.doi.org/10.2139/ssrn.4931927" target="_blank">AIES 2024</a>)
\t> Visibility into AI Agents (Co-author; <a href="https://arxiv.org/abs/2401.13138" target="_blank">FAccT 2024</a>)
\t> Black-Box Access is Insufficient for Rigorous AI Audits (Co-author; <a href="https://arxiv.org/abs/2401.14446" target="_blank">FAccT 2024</a>)


And here are some of my policy reports and public writing:
\t
\t> Preliminary Suggestions for Rigorous GPAI Model Evaluations (Co-authored with Patricia Paskov, Michael Byun, & Toby Webster; <a href="https://arxiv.org/abs/2508.00875" target="_blank">RAND 2025</a>)
\t> Third-Party Compliance Reviews for Frontier AI Safety Frameworks (Co-author; <a href="https://arxiv.org/abs/2505.01643" target="_blank">2025</a>)
\t> Beyond Big Tech: The Revolutionary Potential of State Data Commons (Co-author; <a href="https://www.lawfaremedia.org/article/beyond-big-tech--the-revolutionary-potential-of-state-data-commons" target="_blank">Lawfare 2025</a>)
\t> Bridging the Artificial Intelligence Governance Gap: The United States' and China's Divergent Approaches to Governing General-Purpose Artificial Intelligence (Co-author; <a href="https://arxiv.org/abs/2506.03497" target="_blank">RAND 2024</a>)
\t> Managing Industry Influence in U.S. AI Policy (<a href="https://www.rand.org/pubs/research_briefs/RBA3679-1.html" target="_blank">RAND 2024</a>)
\t> Open Sourcing Highly Capable Foundation Models (Co-author; <a href="https://arxiv.org/abs/2311.09227" target="_blank">GovAI report 2023</a>)
\t> Translation: Notice on the Release of [China's] “Guide to the 2023 Annual Projects for the Major Research Program on Explainable and Generalizable Next-Generation Artificial Intelligence Methods” (Translator; <a href="https://cset.georgetown.edu/publication/china-explainable-ai-projects/" target="_blank">CSET 2023</a>)
\t> Translation: Notice of the [Chinese] Ministry of Science and Technology on the Publication of the Guidelines for National New Generation Artificial Intelligence Innovation and Development Pilot Zone Construction Work (Revised Version) (Translator; <a href="https://cset.georgetown.edu/publication/ai-pilot-zone-guidelines-revised-2020/" target="_blank">CSET 2023</a>)
\t> Creating Transparency and Fairness in Automated Decision Systems for Administrative Agencies (<a href="https://fas.org/publication/creating-transparency-and-fairness-in-automated-decision-systems-for-administrative-agencies/" target="_blank">Federation of American Scientists 2020</a>)
\t 

\t Type <span class = "special">help</span> for more commands.`;

var contact = `Feel free to reach out at <a href="mailto:hi@kevinlwei.com" target="_blank">hi@kevinlwei.com</a>, or just directly schedule some time on my <a href="https://cal.com/kevinwei/15min" target="_blank">calendar</a>. I'm always down to grab some #covfefe, collaborate on research projects, or provide feedback on research / writing drafts.
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
