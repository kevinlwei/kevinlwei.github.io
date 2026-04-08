/*
Commands:

help: display a list of available commands
about: display full bio
social: display links to social media
research: display links to past work
contact: display contact info
meow: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `Right now, I'm an Adjunct at RAND and am conducting independent research on technical AI governance. I am also a <a href="https://www.salzburgglobal.org/" target="_blank" rel="noopener noreferrer">Salzburg Global Fellow</a>, a Working Group Chair of the <a href="https://evaleval.github.io/" target="_blank" rel="noopener noreferrer">Evaluating Evaluations Coalition</a> (EvalEval), and an honoree of New America & Out in National Security's <a href="https://www.outinnationalsecurity.org/honor-roll/2024-new-voices/" target="_blank" rel="noopener noreferrer">2024 New Voices List</a>. Despite academic peer review being somewhat broken, I currently review for NeurIPS, FAccT, AIES, SoLaR, TAIG-ICML, and other venues.
\t 
\tPreviously, I was a Visiting Research Scientist at the UK AI Security Institute on the Science of Evaluations team; a <a href="https://www.rand.org/about/people/w/wei_kevin.html" target="_blank" rel="noopener noreferrer">Fellow</a> in RAND's Center for AI, Security, and Technology; the 2025-2026 Submissions Editor of the <a href="https://jolt.law.harvard.edu" target="_blank" rel="noopener noreferrer">Harvard Journal of Law and Technology</a>; a <a href="https://www.schwarzmanscholars.org/" target="_blank" rel="noopener noreferrer">Schwarzman Scholar</a> in Beijing (where I researched Chinese AI policy); a Summer Fellow at the <a href="https://www.governance.ai/" target="_blank" rel="noopener noreferrer">Centre for the Governance of AI</a>; and a senior program manager at cloud infrastructure provider <a href="https://digitalocean.com" target="_blank" rel="noopener noreferrer">DigitalOcean</a>. When I was more active in politics, I helped co-found <a href="https://www.gofundme.com/f/savenycchinatown-dumplings-against-hate" target="_blank" rel="noopener noreferrer">Dumplings Against Hate</a>, a COVID-19 project that helped raised over $65,000 for charity to support small businesses in New York City's Chinatowns; I also used to serve on the <a href="https://victoryfund.org/about/victory-campaign-board/" target="_blank" rel="noopener noreferrer">LGBTQ+ Victory Fund</a>'s political endorsements board.
\t
\tI have a J.D. from Harvard Law School (as of June 2026), a Master's in Global Affairs from Tsinghua University, an M.S. in Machine Learning from Georgia Tech, and a B.A. in Mathematics-Statistics & Economics from Columbia. I was also a member of the fifth cohort of the <a href="https://www.arena.education/" target="_blank" rel="noopener noreferrer">Alignment Research Engineer Accelerator</a>.
\t
\tOccasionally I have some free time, in which I play classical piano, run, enjoy desserts, and read speculative fiction.
\t
\t To learn more about me, type <span class="special">social</span> to find me around the interwebs, <span class="special">research</span> to see my past work, or <span class="special">contact</span> to reach out.`;

var unformatted_intro = `Hey there! I'm <span class="special">Kevin Wei</span>: a researcher working on the science of AI evaluations (evaluation methodology), legal AI safety/alignment, and technical AI governance/AI law. I work on AI safety/governance because I believe that advanced AI will be one of the most transformative technologies in my lifetime. 
\t
\tTo get in touch, feel free to ping <a href="mailto:contact@kevinlwei.com" target="_blank" rel="noopener noreferrer">contact@kevinlwei.com</a> :)
\t
You can learn about me by typing <span class="special">about</span> or about my research by typing <span class="special">research</span>. Try <span class="special">?</span> or <span class="special">help</span> to see more commands.`;

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
  name: buildSpecialText("pgp"),
  description: "Display my PGP public key"
}, {
  name: buildSpecialText("meow"),
  description: "Display ASCII art of cats"
}, {
  name: buildSpecialText("cls"),
  description: "Clear the screen"
}];

var social = ` 

\t> <a href="https://www.linkedin.com/in/kevinlwei/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
\t> <a href="https://x.com/kevinlwei" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
\t <a href="https://substack.com/@kevinlwei" target="_blank" rel="noopener noreferrer">Substack</a>
\t> <a href="https://github.com/kevinlwei" target="_blank" rel="noopener noreferrer">GitHub</a>
\t> <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
\t
\t Type <span class = "special">help</span> for more commands.`;

var portfolio = `Check <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a> for an updated list of publications; some recent work is below:
\t
\t> Legal Alignment for Safe and Ethical AI (Co-author; <a href="https://arxiv.org/abs/2601.04175" target="_blank" rel="noopener noreferrer">preprint 2026</a>)
\t> Designing Incident Reporting Systems for Harms from General-Purpose AI (First author; <a href="https://arxiv.org/abs/2511.05914" target="_blank" rel="noopener noreferrer">AAAI 2026</a>)
\t> Position: Human Baselines in Model Evaluations Need Rigor and Transparency (With Recommendations & Reporting Checklist) (First author; <a href="https://arxiv.org/abs/2506.13776" target="_blank" rel="noopener noreferrer">ICML 2025 Spotlight</a>)
\t> Methodological Challenges in Agentic Evaluations of AI Systems (First author; <a href="https://openreview.net/forum?id=ZhSKG8IslC" target="_blank" rel="noopener noreferrer">ICML 2025 Technical AI Governance Workshop</a>)
\t> Local US officials' views on the impacts and governance of AI: Evidence from 2022 and 2023 survey waves (Co-first author; <a href="https://arxiv.org/abs/2501.09606" target="_blank" rel="noopener noreferrer">PLOS One 2025</a>)
\t> Infrastructure for AI Agents (Second author; <a href="https://arxiv.org/abs/2501.10114" target="_blank" rel="noopener noreferrer">TMLR 2025</a>)
\t> Who Evaluates AI's Social Impacts? Mapping Coverage and Gaps in First and Third Party Evaluations (Co-author; <a href="https://arxiv.org/abs/2511.05613" target="_blank" rel="noopener noreferrer">preprint 2025</a>)
\t> The AI Agent Index (Co-author; <a href="https://arxiv.org/abs/2502.01635" target="_blank" rel="noopener noreferrer">preprint 2025</a>)
\t> How Do AI Companies "Fine-Tune" Policy? Examining Regulatory Capture in AI Governance (First author; <a href="https://arxiv.org/abs/2410.13042" target="_blank" rel="noopener noreferrer">AIES 2024</a>)
\t> Visibility into AI Agents (Co-author; <a href="https://arxiv.org/abs/2401.13138" target="_blank" rel="noopener noreferrer">FAccT 2024</a>)
\t> Black-Box Access is Insufficient for Rigorous AI Audits (Co-author; <a href="https://arxiv.org/abs/2401.14446" target="_blank" rel="noopener noreferrer">FAccT 2024</a>)


And here are some of my policy reports and public writing:
\t
\t> Preliminary Suggestions for Rigorous GPAI Model Evaluations (Co-authored with Patricia Paskov, Michael Byun, & Toby Webster; <a href="https://arxiv.org/abs/2508.00875" target="_blank" rel="noopener noreferrer">RAND 2025</a>)
\t> Third-Party Compliance Reviews for Frontier AI Safety Frameworks (Co-author; <a href="https://arxiv.org/abs/2505.01643" target="_blank" rel="noopener noreferrer">2025</a>)
\t> Beyond Big Tech: The Revolutionary Potential of State Data Commons (Co-author; <a href="https://www.lawfaremedia.org/article/beyond-big-tech--the-revolutionary-potential-of-state-data-commons" target="_blank" rel="noopener noreferrer">Lawfare 2025</a>)
\t> Bridging the Artificial Intelligence Governance Gap: The United States' and China's Divergent Approaches to Governing General-Purpose Artificial Intelligence (Co-author; <a href="https://arxiv.org/abs/2506.03497" target="_blank" rel="noopener noreferrer">RAND 2024</a>)
\t> Managing Industry Influence in U.S. AI Policy (<a href="https://www.rand.org/pubs/research_briefs/RBA3679-1.html" target="_blank" rel="noopener noreferrer">RAND 2024</a>)
\t> Open Sourcing Highly Capable Foundation Models (Co-author; <a href="https://arxiv.org/abs/2311.09227" target="_blank" rel="noopener noreferrer">GovAI report 2023</a>)
\t> Translation: Notice on the Release of [China's] “Guide to the 2023 Annual Projects for the Major Research Program on Explainable and Generalizable Next-Generation Artificial Intelligence Methods” (Translator; <a href="https://cset.georgetown.edu/publication/china-explainable-ai-projects/" target="_blank" rel="noopener noreferrer">CSET 2023</a>)
\t> Translation: Notice of the [Chinese] Ministry of Science and Technology on the Publication of the Guidelines for National New Generation Artificial Intelligence Innovation and Development Pilot Zone Construction Work (Revised Version) (Translator; <a href="https://cset.georgetown.edu/publication/ai-pilot-zone-guidelines-revised-2020/" target="_blank" rel="noopener noreferrer">CSET 2023</a>)
\t> Creating Transparency and Fairness in Automated Decision Systems for Administrative Agencies (<a href="https://fas.org/publication/creating-transparency-and-fairness-in-automated-decision-systems-for-administrative-agencies/" target="_blank" rel="noopener noreferrer">Federation of American Scientists 2020</a>)

\t Type <span class = "special">help</span> for more commands.`;

var pgp = `For sensitive inquiries, you can reach me at <a href="mailto:contact.kwei@proton.me" target="_blank" rel="noopener noreferrer">contact.kwei@proton.me</a>. Here is my PGP public key for that address:

-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEadYgChYJKwYBBAHaRw8BAQdAXehdwOxf8pHHTxUWBsu7PqVEKRW2OyLv
oN1F3KQ8/53NL2NvbnRhY3Qua3dlaUBwcm90b24ubWUgPGNvbnRhY3Qua3dl
aUBwcm90b24ubWU+wsARBBMWCgCDBYJp1iAKAwsJBwkQ2RqbsTkAgHdFFAAA
AAAAHAAgc2FsdEBub3RhdGlvbnMub3BlbnBncGpzLm9yZ58UKrZfCdxfSx5h
PXX6i1wp8XAFK2EA3yRQk09FmpNKAxUKCAQWAAIBAhkBApsDAh4BFiEEoSTn
npPRcjud/zHn2RqbsTkAgHcAAD2dAP9VagJMYmcB/skfvyjEMtcc8lvNxxkE
pmpKCGcot3jd0wEA1MRVMEEdeVTVoxqN6jdOsk+PHVAoEN9zb77BZzh2YwbO
OARp1iAKEgorBgEEAZdVAQUBAQdAltVL41vQodDDKmeRAGLG5ftGwXHB6MGG
Rz+FfZkIyHgDAQgHwr4EGBYKAHAFgmnWIAoJENkam7E5AIB3RRQAAAAAABwA
IHNhbHRAbm90YXRpb25zLm9wZW5wZ3Bqcy5vcmcuwOlVqzDwVGQR5v4bUeby
j9fMhLpocSpntUD8oMZ6IgKbDBYhBKEk556T0XI7nf8x59kam7E5AIB3AACI
7wD+NLzp4am8plAGB45e6xkVS4Xt1bqzEhSLT1JUi8zxS2MBALOBNH4xaPaL
ZDUecAp8QRUn6KsFTz6uPYzkkWGBOZYM
=n2+8

-----END PGP PUBLIC KEY BLOCK-----

\tAlso available at <a href="/pgp.asc" target="_blank" rel="noopener noreferrer">kevinlwei.com/pgp.asc</a>. 
\t
\tType <span class="special">help</span> for more commands.`;

var contact = `You can reach me via the following methods:

\t> Email (most inquiries): <a href="mailto:contact@kevinlwei.com" target="_blank" rel="noopener noreferrer">contact@kevinlwei.com</a>
\t> Email (sensitive inquiries): <a href="mailto:contact.kwei@proton.me" target="_blank" rel="noopener noreferrer">contact.kwei@proton.me</a>. You can also find my PGP key for that address at <a href="/pgp.asc" target="_blank" rel="noopener noreferrer">kevinlwei.com/pgp</a>.
\t> Signal: @kwei.01
\t> X (Twitter): <a href="https://x.com/kevinlwei" target="_blank" rel="noopener noreferrer">@kevinlwei</a>
\t> LinkedIn: <a href="https://www.linkedin.com/in/kevinlwei/" target="_blank" rel="noopener noreferrer">@kevinlwei</a>
\t> Substack: <a href="https://substack.com/@kevinlwei" target="_blank" rel="noopener noreferrer">@kevinlwei</a>

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
  pgp: pgp,
  cats: cats,
	invalid: invalid
};
