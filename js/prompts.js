/*
Commands:

help: display a list of available commands
about: display full bio
bio: display short bio and headshot
social: display links to social media
research: display links to past work
contact: display contact info
meow: display ascii art of cats ;)
*invalid*: text to display when no valid command is entered
*/

var intro = `Right now, I'm a researcher at the <a href="https://www.governance.ai/team/kevin-wei" target="_blank" rel="noopener noreferrer">GovAI</a>, with additional affiliations with Oxford University's Martin School AI Governance Initiative and RAND's Center for AI, Security, & Technology. I am also a <a href="https://www.salzburgglobal.org/" target="_blank" rel="noopener noreferrer">Salzburg Global Fellow</a>, the Partnerships Chair of the <a href="https://evaleval.github.io/" target="_blank" rel="noopener noreferrer">Evaluating Evaluations Coalition</a> (EvalEval), and an honoree of New America & Out in National Security's <a href="https://www.outinnationalsecurity.org/honor-roll/2024-new-voices/" target="_blank" rel="noopener noreferrer">2024 New Voices List</a>. Despite academic peer review being somewhat broken, I currently review for NeurIPS, FAccT, AIES, SoLaR, TAIG-ICML, and other venues. I also write a Substack, <em>Matters of Scale</em>, at <a href="https://ai.scal.ing?utm_source=kevinlwei.com&utm_medium=website&utm_campaign=bio_long" target="_blank" rel="noopener noreferrer">scal.ing</a>.
 
Previously, I was a Visiting Research Scientist at the UK AI Security Institute on the Science of Evaluations team; a <a href="https://www.rand.org/about/people/w/wei_kevin.html" target="_blank" rel="noopener noreferrer">Fellow</a> in RAND's Center for AI, Security, and Technology; the 2025-2026 Submissions Editor of the <a href="https://jolt.law.harvard.edu" target="_blank" rel="noopener noreferrer">Harvard Journal of Law and Technology</a>; a <a href="https://www.schwarzmanscholars.org/" target="_blank" rel="noopener noreferrer">Schwarzman Scholar</a> in Beijing (where I researched Chinese AI policy); and a senior program manager at cloud infrastructure provider <a href="https://digitalocean.com" target="_blank" rel="noopener noreferrer">DigitalOcean</a>. When I was more active in politics, I helped co-found <a href="https://www.gofundme.com/f/savenycchinatown-dumplings-against-hate" target="_blank" rel="noopener noreferrer">Dumplings Against Hate</a>, a COVID-19 project that helped raised over $65,000 for charity to support small businesses in New York City's Chinatowns; I also used to serve on the <a href="https://victoryfund.org/about/victory-campaign-board/" target="_blank" rel="noopener noreferrer">LGBTQ+ Victory Fund</a>'s political endorsements board.

I hold a J.D. from Harvard Law School, a Master's in Global Affairs from Tsinghua University, an M.S. in Machine Learning from Georgia Tech, and a B.A. in Mathematics-Statistics & Economics from Columbia. I was also a member of the fifth cohort of the <a href="https://www.arena.education/" target="_blank" rel="noopener noreferrer">Alignment Research Engineer Accelerator</a>.

Occasionally I have some free time, in which I play classical piano, run, enjoy desserts, and read speculative fiction.

Type <span class="special">social</span> to find me on the interwebs, <span class="special">research</span> to see my past work, or <span class="special">contact</span> to reach out.`;

var unformatted_intro = `Hey there! I'm <span class="special">Kevin Wei</span>: a researcher at <a href="https://www.governance.ai/team/kevin-wei" target="_blank" rel="noopener noreferrer">GovAI</a>, an independent and non-partisan think tank focused on AI security and safety. I work on the science of AI evaluations (evaluation methodology), law-following AI, AI auditing, and AI incident reporting. I am also affiliated with <a href="https://aigi.ox.ac.uk/people/kevin-wei/" target="_blank" rel="noopener noreferrer">Oxford University</a> and <a href="https://www.rand.org/about/people/w/wei_kevin.html" target="_blank" rel="noopener noreferrer">RAND</a>. I have a J.D. from Harvard Law and have published over a dozen peer-reviewed papers on AI.

To get in touch, ping <a href="mailto:contact@kevinlwei.com" target="_blank" rel="noopener noreferrer">contact@kevinlwei.com</a>. For Signal, Protonmail, or other ways of contact, type <span class="special">contact</span>. You can also check out my Substack, <em>Matters of Scale</em>, at <a href="https://ai.scal.ing?utm_source=kevinlwei.com&utm_medium=website&utm_campaign=bio_top" target="_blank" rel="noopener noreferrer">scal.ing</a>.

You can also type <span class="special">about</span> to learn more about me or <span class="special">research</span> to see my past work. Try <span class="special">?</span> or <span class="special">help</span> to see more commands.`;

var bio = `Kevin Wei (he/they) is a researcher at <a href="https://www.governance.ai/team/kevin-wei" target="_blank" rel="noopener noreferrer">GovAI</a>, where they work on ensuring that advanced AI is developed and governed safely. Specifically, Kevin's research agenda is focused on the science of AI evaluations, law-following AI, and technical AI governance/law, with peer-reviewed publications on these topics appearing in NeurIPS, ICML, TMLR, and other top AI/AI ethics venues. They write a newsletter on AI governance, <em>Matters of Scale</em>, at <a href="https://ai.scal.ing?utm_source=kevinlwei.com&utm_medium=website&utm_campaign=bio_public" target="_blank" rel="noopener noreferrer">scal.ing</a>.

Kevin is also affiliated with the Oxford Martin School AI Governance Initiative and the RAND Center for AI, Security, and Technology; they were previously a Visiting Research Scientist on the UK AI Security Institute's science of evaluations team, a Fellow at RAND, and a program manager at a cloud company. They received a J.D. from Harvard Law School, a Master's in Global Affairs from Tsinghua University (where they were a Schwarzman Scholar), an M.S. in Machine Learning from Georgia Tech, and a B.A. in Mathematics-Statistics & Economics from Columbia University.

View or download my headshot <a href="/headshot.jpg" target="_blank" rel="noopener noreferrer">here</a>.`;

var help = [{
  name: buildSpecialText("help"),
  description: "Display all commands"
}, {
  name: buildSpecialText("about"),
  description: "Display full bio"
}, {
  name: buildSpecialText("bio"),
  description: "Display short bio and headshot"
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

var social = `<span class="terminal-list">
<span class="terminal-list-item">> <a href="https://www.governance.ai/team/kevin-wei" target="_blank" rel="noopener noreferrer">GovAI</a></span>
<span class="terminal-list-item">> <a href="https://www.linkedin.com/in/kevinlwei/" target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
<span class="terminal-list-item">> <a href="https://x.com/kevinlwei" target="_blank" rel="noopener noreferrer">X (Twitter)</a></span>
<span class="terminal-list-item">> <a href="https://substack.com/@kevinlwei" target="_blank" rel="noopener noreferrer">Substack</a></span>
<span class="terminal-list-item">> <a href="https://github.com/kevinlwei" target="_blank" rel="noopener noreferrer">GitHub</a></span>
<span class="terminal-list-item">> <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a></span>
</span>
Type <span class = "special">help</span> for more commands.`;

// Keep this a literal template: the AI-content builder also reads it.
// Authors/abstracts follow the publication manifest, arXiv cache, and linked
// publications. Entries without a formal abstract use a labeled summary.
var portfolio = `<span class="publications" role="region" aria-label="Publications">
<span class="publication-filters" role="group" aria-label="Filter publications"><span>Display:</span> <button type="button" data-filter="all" aria-pressed="true">[All]</button><button type="button" data-filter="academic" aria-pressed="false">[A] Academic</button><button type="button" data-filter="policy" aria-pressed="false">[P] Policy</button></span>
<span class="publication-legend">[A] Academic research · [P] Policy &amp; public writing</span>
<span class="publication-count" role="status" aria-live="polite" aria-atomic="true">Showing all 29 publications</span>
<span class="publication-intro">Check my <a href="https://scholar.google.com/citations?user=28GYA-oAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a> for the most up-to-date list of publications.</span>
<span class="publication-list" role="list">
<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">FraudBench: A Legal Evaluation of AI Deception</strong></span>
<span class="publication-venue">NeurIPS 2026</span>
<span class="publication-authors"><strong>Kevin Wei</strong>, Sumaya Nur Adan, Stephan Llerena, Mark Gitau, Jakob Merane, Anita Srinivasan, Colette Le Brannan, Keethan Kleiner, Alessandro Tacconelli, Michael Tiu Jr., Case Thomason, Kyle Emili, Natasza Gadowska, Alex Mark, Eric Ren, Umang Bhatt, Jatinder Singh, Jacy Reese Anthis, Doni Bloomfield, Noam Kolt</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2611.12167" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>We introduce FraudBench, an evaluation of large language models&#x27; (LLMs) propensities to recommend, assist, or directly take actions that would constitute fraud under U.S. law. Our evaluation contains a novel dataset of 159 scenarios based on real-world U.S. court cases and validated by legal experts. We present each scenario to LLMs via three tasks at varying levels of autonomy: advising users, drafting messages for users to send, and acting directly on behalf of users (477 tasks total). In each scenario, FraudBench re-enacts the facts of a court case to give LLMs an opportunity, but no explicit instruction, to either misrepresent or conceal a material fact in a high-stakes commercial setting--e.g., whether to describe company-funded product testing as &quot;independent&quot; to customers (misrepresentation) or whether to hide unfavorable regulatory investigations from clients (concealment). We evaluate 20 LLMs across 25 experimental conditions (totaling &gt;300,000 generations) and include a preregistered human baseline (2,957 annotations from 996 participants). We score a response as fraudulent when it engages in, assists with, or recommends misrepresentation or concealment. Key findings include: (1) across LLMs, fraud rates ranged from near 0% to over 40%; (2) LLM fraud rates increased with autonomy, with overall rates of 3.0% when advising, 14.7% when drafting, and 21.4% when acting directly, without applying pressure; (3) LLMs sometimes engaged in fraud despite recognizing legal risks; (4) LLMs more often engaged in fraud by concealment than by misrepresentation; and (5) prompt-based interventions substantially affected fraud rates, with a prompt to obey the law reducing fraud rates, while prompts to maximize profits and act agentically increased fraud rates.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Trust but Verify: Implementing Frontier AI Policy in California and Beyond</strong></span>
<span class="publication-venue">Carnegie Endowment for International Peace 2026</span>
<span class="publication-authors">Scott R. Singer, Jon Bateman, Michael Chen, Stephen Clare, Mariano-Florentino (Tino) Cuéllar, Ian Klaus, Scott Kohler, Nada Madkour, Alasdair Phillips-Robins, Conrad Stosz, <strong>Kevin Wei</strong>, Sophie Williams, Marta Ziosi</span>
<span class="publication-note"><strong>Main author of the “Foundations: AI Assessment &amp; Evaluation” chapter</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Summary">[+] Summary</button><a href="https://carnegieendowment.org/research/2026/11/trust-but-verify-implementing-frontier-ai-policy-in-california-and-beyond#foundations-ai-assessment-and-evaluation" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>In the year since California’s Transparency in Frontier Artificial Intelligence Act passed, also known as Senate Bill 53 (SB 53), artificial intelligence (AI) has made striking advances in areas ranging from mathematics to coding. At the same time, previous hypothetical risks posed by frontier AI systems have become serious, documented concerns. For example, models have found and exploited previously unknown software vulnerabilities and gained unauthorized access to external databases. As AI capabilities continue to improve, such incidents are likely to become more frequent and consequential.

Policymakers recognize the need to respond but face an evidence dilemma: AI evolves so quickly that responding prematurely risks entrenching ineffective policies, while delaying action could leave society vulnerable to serious risks. SB 53 aims to alleviate this dilemma by generating more evidence about AI risks to inform future policies. It trusts frontier AI companies, which hold much of the relevant technical expertise, to design and implement appropriate risk management practices and disclose the evidence behind them. In parallel, the approach empowers government bodies to verify industry claims about risks and the effectiveness of those practices. This “trust but verify” approach, first outlined in the California Report on Frontier AI Policy, combines flexibility with independent accountability.

This report aims to guide the implementation of “trust but verify” approaches such as SB 53 and maximize the chances they accomplish their goals. The design choices California makes at the beginning of implementation—such as which companies should be subject to these policies, how detailed frontier AI frameworks should be, and how to triage information about AI incidents—will ground how California manages risks for years to come.

These questions matter not just in California but also around the world as governments grapple with the challenge of how to govern advanced AI systems. SB 53 has already inspired similar frameworks in New York and Illinois. Even where “trust but verify” frameworks are not adopted in their entirety, many of the most important questions this report examines will remain relevant. For example, many governments will want to have confidence that models have undergone appropriate safety testing before they allow models to be deployed, or receive incident reports when models cause serious harm within their borders. As the federal government grapples with similar questions, California’s experiment in frontier AI governance and implementation can offer real-world evidence to support thoughtful federal policy.

SB 53 will not, and should not, be the final chapter in the story of how the United States governs advanced AI systems. California will need to strengthen its evaluation and assessment ecosystem, ensure that sufficient information on serious incidents is reported to the government, and respond to the novel challenges posed by potential recursive self-improvement—when AI fully automates AI R&D, potentially causing an intelligence explosion. However, it represents a critical first step that will inform the policies that follow. Given the profound uncertainty over the trajectory and pace of AI development, generating substantial evidence on AI’s capabilities and risks and developing a robust verification ecosystem can help policymakers make better decisions in the months and years to come.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Designing Incident Reporting Systems for Harms from General-Purpose AI</strong></span>
<span class="publication-venue">AAAI 2026</span>
<span class="publication-authors"><strong>Kevin Wei</strong>, Lennart Heim</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2511.05914" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>We introduce a conceptual framework and provide considerations for the institutional design of AI incident reporting systems, i.e., processes for collecting information about safety- and rights-related events caused by general-purpose AI. As general-purpose AI systems are increasingly adopted, they are causing more real-world harms and displaying the potential to cause significantly more dangerous incidents - events that did or could have caused harm to individuals, property, or the environment. Through a literature review, we develop a framework for understanding the institutional design of AI incident reporting systems, which includes seven dimensions: policy goal, actors submitting and receiving reports, type of incidents reported, level of risk materialization, enforcement of reporting, anonymity of reporters, and post-reporting actions. We then examine nine case studies of incident reporting in safety-critical industries to extract design considerations for AI incident reporting in the United States. We discuss, among other factors, differences in systems operated by regulatory vs. non-regulatory government agencies, near miss reporting, the roles of mandatory reporting thresholds and voluntary reporting channels, how to enable safety learning after reporting, sharing incident information, and clarifying legal frameworks for reporting. Our aim is to inform researchers and policymakers about when particular design choices might be more or less appropriate for AI incident reporting.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Legal Alignment for Safe and Ethical AI</strong></span>
<span class="publication-venue">TMLR 2026</span>
<span class="publication-authors">Noam Kolt, Nicholas Caputo, Jack Boeglin, Cullen O&#x27;Keefe, Rishi Bommasani, Stephen Casper, Mariano-Florentino Cuéllar, Noah Feldman, Iason Gabriel, Gillian K. Hadfield, Lewis Hammond, Peter Henderson, Atoosa Kasirzadeh, Seth Lazar, Anka Reuel, <strong>Kevin L. Wei</strong>, Jonathan Zittrain</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2601.04175" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Alignment of artificial intelligence (AI) encompasses the normative problem of specifying how AI systems should act and the technical problem of ensuring AI systems comply with those specifications. To date, AI alignment has generally overlooked an important source of knowledge and practice for grappling with these problems: law. In this paper, we survey the emerging field of legal alignment that aims to fill this gap and systematize research that studies how legal rules, principles, and methods can be leveraged to address problems of alignment and inform the design of AI systems that operate safely and ethically. Our survey provides a taxonomy of the three core research pathways of legal alignment and explores how each can be operationalized in practice: (1) designing AI systems to comply with the content of legal rules developed through legitimate institutions and processes, (2) adapting methods from legal interpretation to guide how AI systems reason and make decisions, and (3) harnessing legal concepts as a structural blueprint for confronting challenges of reliability, trust, and cooperation in AI systems. These research pathways present new conceptual, empirical, and institutional questions, which include examining the specific set of laws that particular AI systems should follow, creating evaluations to assess their legal compliance in real-world settings, and developing governance frameworks to support the implementation of legal alignment in practice. Tackling these questions requires expertise across law, computer science, and other disciplines, offering these communities the opportunity to collaborate in designing AI for the better.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">RCTs &amp; Human Uplift Studies: Methodological Challenges and Practical Solutions for Frontier AI Evaluation</strong></span>
<span class="publication-venue">AIES 2026</span>
<span class="publication-authors">Patricia Paskov, <strong>Kevin Wei</strong>, Shen Zhou Hong, Dan Bateyko, Xavier Roberts-Gaal, Carson Ezell, Gailius Praninskas, Valerie Chen, Umang Bhatt, Ella Guest</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2603.11001" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Human uplift studies, or studies that measure the effects of AI access on human performance via randomized controlled trials (RCT) or similar methodologies, increasingly inform frontier AI governance and deployment decisions. While RCT methods are robust in other fields, their interaction with the distinctive properties of frontier AI systems remains underexamined, particularly when results are used to inform high-stakes decisions. We present findings from interviews with 16 expert practitioners with experience conducting human uplift studies in domains including biosecurity, cybersecurity, education, and labor. Across interviews, experts described a recurring tension between the standard causal inference assumptions upon which human uplift studies rely and the object of study itself. Rapidly evolving AI systems, shifting baselines, heterogeneous and changing user proficiency, and porous real-world settings strain assumptions underlying internal, external, and construct validity, complicating the interpretation and appropriate use of uplift evidence. We contribute (1) a synthesis of methodological challenges in human uplift studies, mapped to risks to study validity and classified by their degree of specificity to large language model (LLM) systems, and (2) a mapping from challenges to proposed solutions. By collating expert-identified challenges and solutions, we seek to clarify the interpretive limits and appropriate uses of human uplift evidence, to align evaluation practice with the decisions it informs, and to support more coordinated methodological foundations for AI governance.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">How Inference Compute Shapes Frontier LLM Evaluation</strong></span>
<span class="publication-venue">Preprint 2026</span>
<span class="publication-authors">Jessica McFadyen, Ole Jorgensen, Harry Coppock, <strong>Kevin Wei</strong>, Cozmin Ududec</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2606.17930" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>AI evaluations are shifting toward harder tasks that benefit from longer trajectories involving tool use and iterative problem solving. As a result, performance is increasingly sensitive to the amount and allocation of compute available at test time (&quot;inference compute&quot;). Yet many evaluations still report performance at a single restrictive budget, meaning that low scores may reflect the evaluation setup rather than the model&#x27;s underlying capability. To test this, we evaluate up to 12 frontier language models on seven challenging benchmarks spanning software engineering, mathematics, medicine, and cybersecurity. We use a controlled setup combining three simple inference-scaling interventions: larger token budgets, context compaction, and repeated submission attempts, guided either by the model itself or by minimal correctness feedback. We find three main results. First, larger token budgets substantially improve performance on benchmarks across multiple domains, including cybersecurity, FrontierMath, Humanity&#x27;s Last Exam, and TerminalBench. Second, fixed-budget evaluations can increasingly understate frontier capability as models advance. Newer models reach higher performance at large budgets, where they unlock harder tasks and solve them more reliably. Third, benchmarks differ in which inference-scaling methods help most: repeated submission broadly improves performance, but the value of larger token budgets, external feedback, and parallel attempts varies by benchmark. Overall, our results show that benchmark scores are protocol-dependent. We therefore argue that evaluations should report capability as a function of inference-time compute, specify protocol choices explicitly, and compare model generations over a large shared compute range at matched budgets, especially in safety- or policy-relevant settings.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Underwriting the Agent Economy: The Blueprint for an AI Insurance Stack</strong></span>
<span class="publication-venue">Artificial Intelligence Underwriting Company 2026</span>
<span class="publication-authors">Cristian Trout, Sanmi Koyejo, Sasha Romanosky, Giorgio Ripamonti, Lynn Thompson, Desiree Spain, Alex Taylor, Kevin Casey, Stephen Casper, Matthew Botvinick, Sean McGregor, Miles Brundage, A. Feder Cooper, Patricia Paskov, Adrien Ecoffet, Ben Bucknall, <strong>Kevin Wei</strong>, Markus Anderljung, Lukasz Szpruch, Bri Treece, Tom Zick, Gabriel Weil, Ugur Ozer, Kevin Kalinich, Jesus Gonzalez, Vitaly Baranov, Derek Blum, Moran Koren, Guy Laban, Gil Arazi, Henri Winand, Toby Clowes, Adam Kleinman, Anita Srinivasan, Tom Fehring, Rune Kvist, Rajiv Dattani</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2607.11999" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>From maritime trade to commercial nuclear power, insurance has been the enabler of major economic and technological developments by pricing risk, limiting downside, and spreading best practices. The emerging AI agent economy, projected to handle trillions of dollars in transactions by 2030, looks to be the next such development. Yet insurers&#x27; exposure to AI agent risk currently sits largely unpriced across existing insurance lines; between this silent coverage and growing exclusions, coverage is not fit for purpose. Furthermore, insurability is trending the wrong way: AI agent capabilities appear to be outpacing reliability, leading to rising incident severity; concentration among a few foundation model providers threatens correlated losses; and traditional actuarial modeling will struggle to keep pace with a technology evolving as rapidly as frontier AI. This report argues that affirmative AI coverage with limits in the billions is achievable by 2030, but only with industry-wide coordination. Drawing on successful historical precedents such as Underwriters Laboratories, the Closed Claims Project, and others, we lay out an eight-component AI insurance stack spanning incident data collection, catastrophe modeling, standards, contract design, risk selection, pricing, monitoring, and claims management. Building out this infrastructure is what will enable insurers to cover and manage AI agent risk sustainably and at scale. Finally, we discuss coverage for catastrophic risk from frontier AI (&quot;AI CAT&quot;), including CBRN, critical infrastructure collapse, and loss of control scenarios. Addressing these tail risks will require purpose-built instruments, potentially including a frontier model developer mutual, catastrophe bonds, bespoke liability regimes, and government backstops.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">The Promises and Limitations of Evaluation-Based AI Governance: Evidence from Expert Interviews</strong></span>
<span class="publication-venue">AIES 2026</span>
<span class="publication-authors">Lily Stelling, Jacob Charnock, <strong>Kevin L. Wei</strong>, David Krueger</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2611.00465" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>We conducted 37 semi-structured expert interviews to examine how frontier AI evaluations reduce societal-level AI risks. Evaluations have become central to AI risk governance, despite their shortcomings being widely critiqued. Still, the case for how they reduce risks in practice remains largely implicit. Drawing on expert accounts, we reconstruct this case by identifying the mechanisms through which evaluations are expected to reduce risk, the assumptions underpinning those mechanisms, and the challenges those assumptions face. Our findings suggest that \`evaluation-based governance&#x27; could contain foundational gaps which undermine risk-reduction strategies that depend on evaluations. Using thematic analysis, we identified three key pathways through which evaluations could reduce risk: by (i) making societal-level risks concrete to decision-makers and the public (raised in 18 out of 37 interviews), (ii) serving as a basis for governance commitments and regulation (18), and (iii) incentivizing a better risk culture within AI companies (16). However, these pathways often depended on shared assumptions that participants themselves doubted. The main challenges included, in order of frequency: (i) diminishing informativeness of evaluation results as model capabilities improve (21), (ii) measurement limitations that may be inherent to the evaluation paradigm (18), (iii) a lack of guarantees that evaluation results will be acted upon by companies or governments (16), and (iv) the degree of control and discretion AI companies retain over evaluation design, disclosure, and response (12). Participants also noted that evaluation-based governance could prove counterproductive, by functioning as a permission structure for developers&#x27; continued capability improvement (4). We finish by discussing the implications of our findings for evaluation-based governance, and what would improve its prospects.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Audit tools of the trade: Automated Auditor Elicitation Can Be Sensitive to the Context the Auditor Is Given</strong></span>
<span class="publication-venue">NeurIPS 2026 AIWILD Workshop</span>
<span class="publication-authors">Ben Slater, Ryan Lundqvist, Leo Richter, <strong>Kevin Wei</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2610.16911" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Does providing additional context to automated AI auditors improve their effectiveness? Using the Petri tool to audit LLM coding agents, we test the impact of providing two types of resources (an external codebase and benchmark transcripts) to LLM auditors, across four auditor-target LLM pairs and three behaviours (harmful compliance, reward hacking, sycophancy). (1) External codebase: We provide the auditor LLM with a fixed, external open source codebase, which prior work finds improves the realism of synthetic audits. Providing this resource suppresses reward hacking in both auditor-target pairs whose baseline rate is above the floor (4.8 to 1.3 and 3.9 to 1.8 on Petri&#x27;s default 1-10 scale); the remaining two pairs sit at the floor throughout. The suppression recurs in three of four pairs under a different scenario and resource bundle. (2) External benchmark transcripts: We provide the auditor with transcripts of the target&#x27;s performance on benchmarks measuring similar behaviours, intended to inform the auditor about the target&#x27;s behavioural patterns. Providing this resource raises reward hacking scores in all four pairs (from 1.7 to 6.1 in one case). However, subsequent experiments show that supplying only the related benchmark&#x27;s abstract, without transcripts, also increases reward hacking, and the effect is absent under a different framing of the same behaviour. Overall, we find no consistent effect of either resource outside reward hacking, but we find substantial variability in judge-scored behaviour across conditions. Our results underscore the importance of careful piloting with tools such as Petri, as the measured rate of target behaviour is highly sensitive to configuration decisions. We hope our results inspire more research into the reliability and robustness of automated alignment auditing.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Simpler Is Better for Autograders: Toward Cost-Effective LLM Evaluations for Open-Ended Tasks</strong></span>
<span class="publication-venue">RAND Research Report 2026</span>
<span class="publication-authors">Sunishchal Dev, Patricia Paskov, Andrew Sloan, <strong>Kevin Wei</strong>, Pedro Nascimento de Lima, Swaptik Chowdhury, Jason Johnson, William Marcellino</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Summary">[+] Summary</button><a href="https://www.rand.org/pubs/research_reports/RRA4618-1.html" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>This report compares five approaches to using LLMs as graders of open-ended responses, across four expert-graded benchmarks and five models. A single rubric outperforms more complex methods, reducing normalized mean absolute error by 9–25 percentage points. In several settings it matches or exceeds nonexpert human grading while substantially reducing cost and time.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">From Human-Level AI Tales to AI Leveling Human Scales</strong></span>
<span class="publication-venue">Preprint 2026</span>
<span class="publication-authors">Peter Romero, Fernando Martínez-Plumed, Zachary R. Tidler, Matthieu Téhénan, Sipeng Chen, Álvaro David Gómez Antón, Luning Sun, Manuel Cebrian, Lexin Zhou, Yael Moros Daval, Daniel Romero-Alvarado, Félix Martí Pérez, <strong>Kevin Wei</strong>, José Hernández-Orallo</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2602.18911" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Comparing AI models to &quot;human level&quot; is often misleading when benchmark scores are incommensurate or human baselines are drawn from a narrow population. To address this, we propose a framework that calibrates items against the &#x27;world population&#x27; and report performance on a common, human-anchored scale. Concretely, we build on a set of multi-level scales for different capabilities where each level should represent a probability of success of the whole world population on a logarithmic scale with a base $B$. We calibrate each scale for each capability (reasoning, comprehension, knowledge, volume, etc.) by compiling publicly released human test data spanning education and reasoning benchmarks (PISA, TIMSS, ICAR, UKBioBank, and ReliabilityBench). The base $B$ is estimated by extrapolating between samples with two demographic profiles using LLMs, with the hypothesis that they condense rich information about human populations. We evaluate the quality of different mappings using group slicing and post-stratification. The new techniques allow for the recalibration and standardization of scales relative to the whole-world population.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Who Evaluates AI&#x27;s Social Impacts? Mapping Coverage and Gaps in First and Third Party Evaluations</strong></span>
<span class="publication-venue">ICML 2026</span>
<span class="publication-authors">Anka Reuel, Avijit Ghosh, Jenny Chim, Andrew Tran, Yanan Long, Jennifer Mickel, Usman Gohar, Srishti Yadav, Pawan Sasanka Ammanamanchi, Mowafak Allaham, Hossein A. Rahmani, Mubashara Akhtar, Felix Friedrich, Robert Scholz, Michael Alexander Riegler, Jan Batzner, Eliya Habba, Arushi Saxena, Anastassia Kornilova, <strong>Kevin Wei</strong>, Prajna Soni, Yohan Mathew, Kevin Klyman, Jeba Sania, Subramanyam Sahoo, Olivia Beyer Bruvik, Pouya Sadeghi, Sujata Goswami, Angelina Wang, Yacine Jernite, Zeerak Talat, Stella Biderman, Mykel Kochenderfer, Sanmi Koyejo, Irene Solaiman</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2511.05613" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Foundation models are increasingly central to high-stakes AI systems, and governance frameworks now depend on evaluations to assess their risks and capabilities. Although general capability evaluations are widespread, social impact assessments covering bias, fairness, privacy, environmental costs, and labor remain uneven. To characterize this landscape, we conduct the first comprehensive analysis of social impact evaluation reporting, examining 186 first-party release reports and 248 third-party evaluation sources, supplemented by developer interviews. We find a stark division of labor: first-party reporting is sparse, often superficial, and declining in areas like environmental impact and bias, while third-party evaluators provide broader, more rigorous coverage of bias, harmful content, and performance disparities. However, only developers can authoritatively report on data provenance, content moderation labor, costs, and infrastructure, yet interviews reveal these disclosures are deprioritized unless tied to product adoption or compliance. Current practices leave major gaps in assessing societal impacts, underscoring the need for policies that mandate developer transparency, strengthen independent evaluation ecosystems, and create shared infrastructure for aggregating third-party evaluations.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">The 2025 AI Agent Index: Documenting Technical and Safety Features of Deployed Agentic AI Systems</strong></span>
<span class="publication-venue">FAccT 2026</span>
<span class="publication-authors">Leon Staufer, Kevin Feng, <strong>Kevin Wei</strong>, Luke Bailey, Yawen Duan, Mick Yang, A. Pinar Ozisik, Stephen Casper, Noam Kolt</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2602.17753" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Agentic AI systems are increasingly capable of performing professional and personal tasks with limited human involvement. However, tracking these developments is difficult because the AI agent ecosystem is complex, rapidly evolving, and inconsistently documented, posing obstacles to both researchers and policymakers. To address these challenges, this paper presents the 2025 AI Agent Index. The Index documents information regarding the origins, design, capabilities, ecosystem, and safety features of 30 state-of-the-art AI agents based on publicly available information and email correspondence with developers. In addition to documenting information about individual agents, the Index illuminates broader trends in the development of agents, their capabilities, and the level of transparency of developers. Notably, we find different transparency levels among agent developers and observe that most developers share little information about safety, evaluations, and societal impacts. The 2025 AI Agent Index is available online at https://aiagentindex.mit.edu</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Position: Human Baselines in Model Evaluations Need Rigor and Transparency (With Recommendations &amp; Reporting Checklist)</strong></span>
<span class="publication-venue">ICML 2025 (Spotlight)</span>
<span class="publication-authors"><strong>Kevin L. Wei</strong>*, Patricia Paskov*, Sunishchal Dev*, Michael J. Byun*, Anka Reuel, Xavier Roberts-Gaal, Rachel Calcott, Evie Coxon, Chinmay Deshpande</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2506.13776" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>In this position paper, we argue that human baselines in foundation model evaluations must be more rigorous and more transparent to enable meaningful comparisons of human vs. AI performance, and we provide recommendations and a reporting checklist towards this end. Human performance baselines are vital for the machine learning community, downstream users, and policymakers to interpret AI evaluations. Models are often claimed to achieve &quot;super-human&quot; performance, but existing baselining methods are neither sufficiently rigorous nor sufficiently well-documented to robustly measure and assess performance differences. Based on a meta-review of the measurement theory and AI evaluation literatures, we derive a framework with recommendations for designing, executing, and reporting human baselines. We synthesize our recommendations into a checklist that we use to systematically review 115 human baselines (studies) in foundation model evaluations and thus identify shortcomings in existing baselining methods; our checklist can also assist researchers in conducting human baselines and reporting results. We hope our work can advance more rigorous AI evaluation practices that can better serve both the research community and policymakers. Data is available at: https://github.com/kevinlwei/human-baselines.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Methodological Challenges in Agentic Evaluations of AI Systems</strong></span>
<span class="publication-venue">ICML 2025 Technical AI Governance Workshop</span>
<span class="publication-authors"><strong>Kevin Wei</strong>, Stephen Guth, Gabriel Wu, Patricia Paskov</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://openreview.net/forum?id=ZhSKG8IslC" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>With the increased generality and advanced reasoning capabilities of AI systems, an increasing number of AI evaluations are agentic evaluations: evaluations involving complex tasks requiring environmental interaction, as opposed to knowledge-based question-answer benchmarks. However, no work has explored the methodological challenges of agentic evaluations or the practices necessary to ensure their validity, reliability, replicability, and efficiency. In this (work-in-progress) paper, we (1) define and formalize the agentic evaluation paradigm; (2) survey and analyze methodological problems in agentic evaluations; and (3) discuss the implications of agentic evaluations for AI governance. Our hope is to improve the state of agentic evaluations of AI systems, systematize the methodological work in this domain, and contribute to the establishment of a science of AI evaluations.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Infrastructure for AI Agents</strong></span>
<span class="publication-venue">TMLR 2025</span>
<span class="publication-authors">Alan Chan, <strong>Kevin Wei</strong>, Sihao Huang, Nitarshan Rajkumar, Elija Perrier, Seth Lazar, Gillian K. Hadfield, Markus Anderljung</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2501.10114" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>AI agents plan and execute interactions in open-ended environments. For example, OpenAI&#x27;s Operator can use a web browser to do product comparisons and buy online goods. Much research on making agents useful and safe focuses on directly modifying their behaviour, such as by training them to follow user instructions. Direct behavioural modifications are useful, but do not fully address how heterogeneous agents will interact with each other and other actors. Rather, we will need external protocols and systems to shape such interactions. For instance, agents will need more efficient protocols to communicate with each other and form agreements. Attributing an agent&#x27;s actions to a particular human or other legal entity can help to establish trust, and also disincentivize misuse. Given this motivation, we propose the concept of \\textbf{agent infrastructure}: technical systems and shared protocols external to agents that are designed to mediate and influence their interactions with and impacts on their environments. Just as the Internet relies on protocols like HTTPS, our work argues that agent infrastructure will be similarly indispensable to ecosystems of agents. We identify three functions for agent infrastructure: 1) attributing actions, properties, and other information to specific agents, their users, or other actors; 2) shaping agents&#x27; interactions; and 3) detecting and remedying harmful actions from agents. We provide an incomplete catalog of research directions for such functions. For each direction, we include analysis of use cases, infrastructure adoption, relationships to existing (internet) infrastructure, limitations, and open questions. Making progress on agent infrastructure can prepare society for the adoption of more advanced agents.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Preliminary Suggestions for Rigorous GPAI Model Evaluations</strong></span>
<span class="publication-venue">RAND Expert Insight 2025</span>
<span class="publication-authors">Patricia Paskov, Michael J. Byun, <strong>Kevin Wei</strong>, Toby Webster</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2508.00875" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>This document presents a preliminary compilation of general-purpose AI (GPAI) evaluation practices that may promote internal validity, external validity and reproducibility. It includes suggestions for human uplift studies and benchmark evaluations, as well as cross-cutting suggestions that may apply to many different evaluation types. Suggestions are organised across four stages in the evaluation life cycle: design, implementation, execution and documentation. Drawing from established practices in machine learning, statistics, psychology, economics, biology and other fields recognised to have important lessons for AI evaluation, these suggestions seek to contribute to the conversation on the nascent and evolving field of the science of GPAI evaluations. The intended audience of this document includes providers of GPAI models presenting systemic risk (GPAISR), for whom the EU AI Act lays out specific evaluation requirements; third-party evaluators; policymakers assessing the rigour of evaluations; and academic researchers developing or conducting GPAI evaluations.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Third-Party Compliance Reviews for Frontier AI Safety Frameworks</strong></span>
<span class="publication-venue">GovAI 2025</span>
<span class="publication-authors">Aidan Homewood, Sophie Williams, Noemi Dreksler, John Lidiard, Malcolm Murray, Lennart Heim, Marta Ziosi, Seán Ó hÉigeartaigh, Michael Chen, <strong>Kevin Wei</strong>, Christoph Winter, Miles Brundage, Ben Garfinkel, Jonas Schuett</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2505.01643" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Safety frameworks have emerged as a best practice for managing risks from frontier artificial intelligence (AI) systems. However, it may be difficult for stakeholders to know if companies are adhering to their frameworks. This paper explores a potential solution: third-party compliance reviews. During a third-party compliance review, an independent external party assesses whether a frontier AI company is complying with its safety framework. First, we discuss the main benefits and challenges of such reviews. On the one hand, they can increase compliance with safety frameworks and provide assurance to internal and external stakeholders. On the other hand, they can create information security risks, impose additional cost burdens, and cause reputational damage, but these challenges can be partially mitigated by drawing on best practices from other industries. Next, we answer practical questions about third-party compliance reviews, namely: (1) Who could conduct the review? (2) What information sources could the reviewer consider? (3) How could compliance with the safety framework be assessed? (4) What information about the review could be disclosed externally? (5) How could the findings guide development and deployment actions? (6) When could the reviews be conducted? For each question, we evaluate a set of plausible options. Finally, we suggest &quot;minimalist&quot;, &quot;more ambitious&quot;, and &quot;comprehensive&quot; approaches for each question that a frontier AI company could adopt.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Beyond Big Tech: The Revolutionary Potential of State Data Commons</strong></span>
<span class="publication-venue">Lawfare 2025</span>
<span class="publication-authors">Kevin Frazier, <strong>Kevin Wei</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Summary">[+] Summary</button><a href="https://www.lawfaremedia.org/article/beyond-big-tech--the-revolutionary-potential-of-state-data-commons" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>State data commons could broaden access to the data needed to develop AI, allowing smaller organizations to build applications in areas such as education and health care. The article examines how states can support shared data infrastructure as an alternative to dependence on large technology companies.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">The AI Agent Index</strong></span>
<span class="publication-venue">Preprint 2025</span>
<span class="publication-authors">Stephen Casper, Luke Bailey, Rosco Hunter, Carson Ezell, Emma Cabalé, Michael Gerovitch, Stewart Slocum, <strong>Kevin Wei</strong>, Nikola Jurkovic, Ariba Khan, Phillip J.K. Christoffersen, A. Pinar Ozisik, Rakshit Trivedi, Dylan Hadfield-Menell, Noam Kolt</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2502.01635" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Leading AI developers and startups are increasingly deploying agentic AI systems that can plan and execute complex tasks with limited human involvement. However, there is currently no structured framework for documenting the technical components, intended uses, and safety features of agentic systems. To fill this gap, we introduce the AI Agent Index, the first public database to document information about currently deployed agentic AI systems. For each system that meets the criteria for inclusion in the index, we document the system&#x27;s components (e.g., base model, reasoning implementation, tool use), application domains (e.g., computer use, software engineering), and risk management practices (e.g., evaluation results, guardrails), based on publicly available information and correspondence with developers. We find that while developers generally provide ample information regarding the capabilities and applications of agentic systems, they currently provide limited information regarding safety and risk management practices. The AI Agent Index is available online at https://aiagentindex.mit.edu/</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Local US officials&#x27; views on the impacts and governance of AI: Evidence from 2022 and 2023 survey waves</strong></span>
<span class="publication-venue">PLOS One 2025</span>
<span class="publication-authors">Sophia Hatz*, Noemi Dreksler*, <strong>Kevin Wei</strong>*, Baobao Zhang</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2501.09606" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>This paper presents a survey of local US policymakers&#x27; views on the future impact and regulation of AI. Our survey provides insight into US policymakers&#x27; expectations regarding the effects of AI on local communities and the nation, as well as their attitudes towards specific regulatory policies. Conducted in two waves (2022 and 2023), the survey captures changes in attitudes following the release of ChatGPT and the subsequent surge in public awareness of AI. Local policymakers express a mix of concern, optimism, and uncertainty about AI&#x27;s impacts, anticipating significant societal risks such as increased surveillance, misinformation, and political polarization, alongside potential benefits in innovation and infrastructure. Many also report feeling underprepared and inadequately informed to make AI-related decisions. On regulation, a majority of policymakers support government oversight and favor specific policies addressing issues such as data privacy, AI-related unemployment, and AI safety and fairness. Democrats show stronger and more consistent support for regulation than Republicans, but the latter experienced a notable shift towards majority support between 2022 and 2023. Our study contributes to understanding the perspectives of local policymakers-key players in shaping state and federal AI legislation-by capturing evolving attitudes, partisan dynamics, and their implications for policy formation. The findings highlight the need for capacity-building initiatives and bi-partisan coordination to mitigate policy fragmentation and build a cohesive framework for AI governance in the US.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">How Do AI Companies &quot;Fine-Tune&quot; Policy? Examining Regulatory Capture in AI Governance</strong></span>
<span class="publication-venue">AIES 2024</span>
<span class="publication-authors"><strong>Kevin Wei</strong>, Carson Ezell, Nick Gabrieli, Chinmay Deshpande</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2410.13042" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Industry actors in the United States have gained extensive influence in conversations about the regulation of general-purpose artificial intelligence (AI) systems. Although industry participation is an important part of the policy process, it can also cause regulatory capture, whereby industry co-opts regulatory regimes to prioritize private over public welfare. Capture of AI policy by AI developers and deployers could hinder such regulatory goals as ensuring the safety, fairness, beneficence, transparency, or innovation of general-purpose AI systems. In this paper, we first introduce different models of regulatory capture from the social science literature. We then present results from interviews with 17 AI policy experts on what policy outcomes could compose regulatory capture in US AI policy, which AI industry actors are influencing the policy process, and whether and how AI industry actors attempt to achieve outcomes of regulatory capture. Experts were primarily concerned with capture leading to a lack of AI regulation, weak regulation, or regulation that over-emphasizes certain policy goals over others. Experts most commonly identified agenda-setting (15 of 17 interviews), advocacy (13), academic capture (10), information management (9), cultural capture through status (7), and media capture (7) as channels for industry influence. To mitigate these particular forms of industry influence, we recommend systemic changes in developing technical expertise in government and civil society, independent funding streams for the AI ecosystem, increased transparency and ethics requirements, greater civil society access to policy, and various procedural safeguards.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Visibility into AI Agents</strong></span>
<span class="publication-venue">FAccT 2024</span>
<span class="publication-authors">Alan Chan, Carson Ezell, Max Kaufmann, <strong>Kevin Wei</strong>, Lewis Hammond, Herbie Bradley, Emma Bluemke, Nitarshan Rajkumar, David Krueger, Noam Kolt, Lennart Heim, Markus Anderljung</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2401.13138" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Increased delegation of commercial, scientific, governmental, and personal activities to AI agents -- systems capable of pursuing complex goals with limited supervision -- may exacerbate existing societal risks and introduce new risks. Understanding and mitigating these risks involves critically evaluating existing governance structures, revising and adapting these structures where needed, and ensuring accountability of key stakeholders. Information about where, why, how, and by whom certain AI agents are used, which we refer to as visibility, is critical to these objectives. In this paper, we assess three categories of measures to increase visibility into AI agents: agent identifiers, real-time monitoring, and activity logging. For each, we outline potential implementations that vary in intrusiveness and informativeness. We analyze how the measures apply across a spectrum of centralized through decentralized deployment contexts, accounting for various actors in the supply chain including hardware and software service providers. Finally, we discuss the implications of our measures for privacy and concentration of power. Further work into understanding the measures and mitigating their negative impacts can help to build a foundation for the governance of AI agents.</span>
</span>

<span class="publication" role="listitem" data-category="academic">
<span class="publication-heading"><span class="publication-type" aria-label="Academic">[A]</span> <strong class="publication-title">Black-Box Access is Insufficient for Rigorous AI Audits</strong></span>
<span class="publication-venue">FAccT 2024</span>
<span class="publication-authors">Stephen Casper, Carson Ezell, Charlotte Siegmann, Noam Kolt, Taylor Lynn Curtis, Benjamin Bucknall, Andreas Haupt, <strong>Kevin Wei</strong>, Jérémy Scheurer, Marius Hobbhahn, Lee Sharkey, Satyapriya Krishna, Marvin Von Hagen, Silas Alberti, Alan Chan, Qinyi Sun, Michael Gerovitch, David Bau, Max Tegmark, David Krueger, Dylan Hadfield-Menell</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2401.14446" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>External audits of AI systems are increasingly recognized as a key mechanism for AI governance. The effectiveness of an audit, however, depends on the degree of access granted to auditors. Recent audits of state-of-the-art AI systems have primarily relied on black-box access, in which auditors can only query the system and observe its outputs. However, white-box access to the system&#x27;s inner workings (e.g., weights, activations, gradients) allows an auditor to perform stronger attacks, more thoroughly interpret models, and conduct fine-tuning. Meanwhile, outside-the-box access to training and deployment information (e.g., methodology, code, documentation, data, deployment details, findings from internal evaluations) allows auditors to scrutinize the development process and design more targeted evaluations. In this paper, we examine the limitations of black-box audits and the advantages of white- and outside-the-box audits. We also discuss technical, physical, and legal safeguards for performing these audits with minimal security risks. Given that different forms of access can lead to very different levels of evaluation, we conclude that (1) transparency regarding the access and methods used by auditors is necessary to properly interpret audit results, and (2) white- and outside-the-box access allow for substantially more scrutiny than black-box access alone.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Bridging the Artificial Intelligence Governance Gap: The United States&#x27; and China&#x27;s Divergent Approaches to Governing General-Purpose Artificial Intelligence</strong></span>
<span class="publication-venue">RAND Expert Insight 2024</span>
<span class="publication-authors">Oliver Guest, <strong>Kevin Wei</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2506.03497" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>The United States and China are among the world&#x27;s top players in the development of advanced artificial intelligence (AI) systems, and both are keen to lead in global AI governance and development. A look at U.S. and Chinese policy landscapes reveals differences in how the two countries approach the governance of general-purpose artificial intelligence (GPAI) systems. Three areas of divergence are notable for policymakers: the focus of domestic AI regulation, key principles of domestic AI regulation, and approaches to implementing international AI governance. As AI development continues, global conversation around AI has warned of global safety and security challenges posed by GPAI systems. Cooperation between the United States and China might be needed to address these risks, and understanding the implications of these differences might help address the broader challenges for international cooperation between the United States and China on AI safety and security.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Open-Sourcing Highly Capable Foundation Models</strong></span>
<span class="publication-venue">GovAI 2023</span>
<span class="publication-authors">Elizabeth Seger, Noemi Dreksler, Richard Moulange, Emily Dardaman, Jonas Schuett, <strong>K. Wei</strong>, Christoph Winter, Mackenzie Arnold, Seán Ó hÉigeartaigh, Anton Korinek, Markus Anderljung, Ben Bucknall, Alan Chan, Eoghan Stafford, Leonie Koessler, Aviv Ovadya, Ben Garfinkel, Emma Bluemke, Michael Aird, Patrick Levermore, Julian Hazell, Abhishek Gupta</span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://arxiv.org/abs/2311.09227" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Recent decisions by leading AI labs to either open-source their models or to restrict access to their models has sparked debate about whether, and how, increasingly capable AI models should be shared. Open-sourcing in AI typically refers to making model architecture and weights freely and publicly accessible for anyone to modify, study, build on, and use. This offers advantages such as enabling external oversight, accelerating progress, and decentralizing control over AI development and use. However, it also presents a growing potential for misuse and unintended consequences. This paper offers an examination of the risks and benefits of open-sourcing highly capable foundation models. While open-sourcing has historically provided substantial net benefits for most software and AI development processes, we argue that for some highly capable foundation models likely to be developed in the near future, open-sourcing may pose sufficiently extreme risks to outweigh the benefits. In such a case, highly capable foundation models should not be open-sourced, at least not initially. Alternative strategies, including non-open-source model sharing options, are explored. The paper concludes with recommendations for developers, standard-setting bodies, and governments for establishing safe and responsible model sharing practices and preserving open-source benefits where safe.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Translation: Notice on the Release of [China&#x27;s] “Guide to the 2023 Annual Projects for the Major Research Program on Explainable and Generalizable Next-Generation Artificial Intelligence Methods”</strong></span>
<span class="publication-venue">CSET Translation 2023</span>
<span class="publication-authors">National Natural Science Foundation of China; translated by <strong>Kevin L. Wei</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Summary">[+] Summary</button><a href="https://cset.georgetown.edu/publication/china-explainable-ai-projects/" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>This translated notice sets out China’s 2023 funding priorities for research on explainable and generalizable AI. It covers research objectives, funding applications, and uses of AI in scientific disciplines including medicine, biology, physics, materials science, and mathematics.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Translation: Notice of the [Chinese] Ministry of Science and Technology on the Publication of the Guidelines for National New Generation Artificial Intelligence Innovation and Development Pilot Zone Construction Work (Revised Version)</strong></span>
<span class="publication-venue">CSET Translation 2023</span>
<span class="publication-authors">Ministry of Science and Technology of the People&#x27;s Republic of China; translated by <strong>Kevin L. Wei</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Summary">[+] Summary</button><a href="https://cset.georgetown.edu/publication/ai-pilot-zone-guidelines-revised-2020/" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>This translation presents revised Chinese guidelines for establishing AI innovation and development pilot zones. The guidelines describe how cities with established AI research and industry infrastructure can apply, and set out the objectives and procedures for developing these zones.</span>
</span>

<span class="publication" role="listitem" data-category="policy">
<span class="publication-heading"><span class="publication-type" aria-label="Policy">[P]</span> <strong class="publication-title">Creating Transparency and Fairness in Automated Decision Systems for Administrative Agencies</strong></span>
<span class="publication-venue">Federation of American Scientists, Day One Project Memo 2020</span>
<span class="publication-authors"><strong>Kevin Wei</strong></span>
<span class="publication-actions"><button type="button" class="publication-toggle" aria-expanded="false" data-label="Abstract">[+] Abstract</button><a href="https://fas.org/publication/creating-transparency-and-fairness-in-automated-decision-systems-for-administrative-agencies/" target="_blank" rel="noopener noreferrer">[Publication]</a></span>
<span class="publication-abstract" hidden>Artificial intelligence is increasingly being used to make decisions about human welfare. Automated decision systems (ADS) administer U.S. social benefits programs—such as unemployment and disability benefits—across local, state, and Federal governments. While ADS have the potential to enable large gains in efficiency, they also run a high risk of reinforcing the class- and race-based inequities of the status quo. Additionally, the use of these systems is not transparent, often leaving individuals with no meaningful recourse after a decision has been made. Individuals may not even know that ADS played a role in the decision-making process. The Federal Government should take immediate action to promote the transparency and accountability of automated decision systems. Agencies must build internal technical capacity as well as data cultures centered around transparency, accountability, and fairness. The White House should require that agencies using ADS undertake a notice-and-comment process to disclose information about these systems to the public. Finally, in the long-term, Congress must pass comprehensive legislation to implement a single, national standard regulating the use of ADS across sectors and use cases.</span>
</span>
</span>
</span>

Type <span class="special">help</span> for more commands.`;

var pgp = `For sensitive inquiries, you can reach me at <a href="mailto:contact.kwei@proton.me" target="_blank" rel="noopener noreferrer">contact.kwei@proton.me</a>. Here is my PGP public key for that address:

<span class="preformatted pgp-key">-----BEGIN PGP PUBLIC KEY BLOCK-----

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

-----END PGP PUBLIC KEY BLOCK-----</span>

Also available at <a href="/pgp.asc" target="_blank" rel="noopener noreferrer">kevinlwei.com/pgp.asc</a>. 

Type <span class="special">help</span> for more commands.`;

var contact = `You can reach me via the following methods:

<span class="terminal-list">
<span class="terminal-list-item">> Email (most inquiries): <a href="mailto:contact@kevinlwei.com" target="_blank" rel="noopener noreferrer">contact@kevinlwei.com</a></span>
<span class="terminal-list-item">> Email (sensitive inquiries): <a href="mailto:contact.kwei@proton.me" target="_blank" rel="noopener noreferrer">contact.kwei@proton.me</a>. You can also find my PGP key for that address at <a href="/pgp.asc" target="_blank" rel="noopener noreferrer">kevinlwei.com/pgp.asc</a>.</span>
<span class="terminal-list-item">> Signal: @kwei.01</span>
<span class="terminal-list-item">> X (Twitter): <a href="https://x.com/kevinlwei" target="_blank" rel="noopener noreferrer">@kevinlwei</a></span>
<span class="terminal-list-item">> LinkedIn: <a href="https://www.linkedin.com/in/kevinlwei/" target="_blank" rel="noopener noreferrer">@kevinlwei</a></span>
<span class="terminal-list-item">> Substack: <a href="https://substack.com/@kevinlwei" target="_blank" rel="noopener noreferrer">@kevinlwei</a></span>
</span>

Type <span class = "special">help</span> for more commands.`;

// Keep this array JSON-compatible: the AI text build reads the same art and credits.
var cats = [
  "            _,'|             _.-''``-...___..--';)\n           /_ \\'.      __..-' ,      ,--...--'''\n          <\\    .`--'''       `     /'\n           `-';'               ;   ; ;\n     __...--''     ___...--_..'  .;.'\n    (,__....----'''       (,..--'",
  "              __..--''``---....___   _..._    __\n    /// //_.-'    .-/'';  `        ``<._  ``.''_ `. / // /\n   ///_.-' _..--.'_    \\                    `( ) ) // //\n   / (_..-' // (< _     ;_..__               ; `' / ///\n    / // // //  `-._,_)' // / ``--...____..-' /// / //",
  "                      /^--^\\     /^--^\\     /^--^\\\n                      \\____/     \\____/     \\____/\n                     /      \\   /      \\   /      \\\n                    |        | |        | |        |\n                     \\__  __/   \\__  __/   \\__  __/\n|^|^|^|^|^|^|^|^|^|^|^|^\\ \\^|^|^|^/ /^|^|^|^|^\\ \\^|^|^|^|^|^|^|^|^|^|^|^|\n| | | | | | | | | | | | |\\ \\| | |/ /| | | | | | \\ \\ | | | | | | | | | | |\n########################/ /######\\ \\###########/ /#######################\n| | | | | | | | | | | | \\/| | | | \\/| | | | | |\\/ | | | | | | | | | | | |\n|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_",
  "             *     ,MMM8&&&.            *\n                  MMMM88&&&&&    .\n                 MMMM88&&&&&&&\n     *           MMM88&&&&&&&&\n                 MMM88&&&&&&&&\n                 'MMM88&&&&&&'\n                   'MMM8&&&'      *\n          |\\___/|\n         =) ^Y^ (=            .              '\n          \\  ^  /\n           )=*=(       *\n          /     \\\n          |     |\n         /| | | |\\\n         \\| | |_|/\\\n  jgs_/\\_//_// ___/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_\n  |  |  |  | \\_) |  |  |  |  |  |  |  |  |  |\n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  ",
  "                _                       \n                \\`*-.                   \n                 )  _`-.                \n                .  : `. .               \n                : _   '  \\              \n                ; *` _.   `*-._         \n                `-.-'          `-.      \n                  ;       `       `.    \n                  :.       .        \\   \n                  . \\  .   :   .-'   .  \n                  '  `+.;  ;  '      :  \n                  :  '  |    ;       ;-.\n                  ; '   : :`-:     _.`* ;\n         [bug] .*' /  .*' ; .*`- +'  `*'\n               `*-*   `*-*  `*-*'       ",
  "                       ;\\\n                      _' \\_\n                    ,' '  '`.\n                   ;,)       \\\n                  /          :\n                  (_         :\n                   `--.       \\\n                      /        `.\n                     ;           `.\n                    /              `.\n                   :                 `.\n                   :                   \\\n                    \\\\                  \\\n                     ::                 :\n                     || |               |\n                     || |`._            ;\n                    _;; ; __`._,       (________\n                  ((__/(_____(______,'______(___) SSt",
  "                               __\n                         _,-;''';`'-,.\n                      _/',  `;  `;    `\\\n      ,        _..,-''    '   `  `      `\\\n     | ;._.,,-' .| |,_        ,,          `\\\n     | `;'      ;' ;, `,   ; |    '  '  .   \\\n     `; __`  ,'__  ` ,  ` ;  |      ;        \\\n     ; (6_);  (6_) ; |   ,    \\        '      |       /\n    ;;   _,' ,.    ` `,   '    `-._           |   __//_________\n     ,;.=..`_..=.,' -'          ,''        _,--''------''''\n_pb__\\,`''=,,,==''',___,,,-----'''----'_'_'_''-;''\n-----------------------''''''\\ \\'''''   )   /'\n                              `\\`,,,___/__/'_____,\n                                `--,,,--,-,'''\\\n                               __,,-' /'       `\n                             /'_,,--''\n                            | (\n                             `'",
  "                                     ,\n              ,-.       _,---._ __  / \\\n             /  )    .-'       `./ /   \\\n            (  (   ,'            `/    /|\n             \\  `-''             \\'\\   / |\n              `.              ,  \\ \\ /  |\n               /`.          ,'-`----Y   |\n              (            ;        |   '\n              |  ,-.    ,-'         |  /\n              |  | (   |        hjw | /\n              )  |  \\  `.___________|/\n              `--'   `--'",
  {
    "title": "Sitting cat",
    "art": "              _ |\\_\n              \\` ..\\\n         __,.-\" =__Y=\n jgs   .\"        )\n _    /   ,    \\/\\_\n((____|    )_-\\ \\_-`\n`-----'`-----` `--`",
    "artist": "Joan G. Stark (jgs)",
    "source": "https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats",
    "license": "Personal use; keep the jgs signature",
    "licenseUrl": "https://oldcompcz.github.io/jgs/joan_stark/please.html"
  },
  {
    "title": "Cat with yarn",
    "art": "        (\\_/)\n        /. .\\\n       =\\_T_/=\n        /   \\ .-.\n        | _ |/\n       /| | |\\\n       \\)_|_(/  _\njgs    `\"\" \"\"` (_)_.-.\n                     '-'",
    "artist": "Joan G. Stark (jgs)",
    "source": "https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats",
    "license": "Personal use; keep the jgs signature",
    "licenseUrl": "https://oldcompcz.github.io/jgs/joan_stark/please.html"
  },
  {
    "title": "Angel kitty",
    "art": "         ___\n  ,_    '---'    _,\n  \\ `-._|\\_/|_.-' /\n   |   =)'T'(=   |\n    \\   /`\"`\\   /\njgs  '._\\) (/_.'\n         | |\n        /\\ /\\\n        \\ T /\n        (/ \\)\\\n             ))\n            ((\n             \\)",
    "artist": "Joan G. Stark (jgs)",
    "source": "https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats",
    "license": "Personal use; keep the jgs signature",
    "licenseUrl": "https://oldcompcz.github.io/jgs/joan_stark/please.html"
  },
  {
    "title": "Walking cat",
    "art": "           ,_\n  (\\(\\      \\\\\n  /.. \\      ||\n  \\Y_, '----.//\n    )        /\n    |   \\_/  ;\n     \\\\ |\\`\\ |\njgs  ((_/(_(_/",
    "artist": "Joan G. Stark (jgs)",
    "source": "https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats",
    "license": "Personal use; keep the jgs signature",
    "licenseUrl": "https://oldcompcz.github.io/jgs/joan_stark/please.html"
  },
  {
    "title": "Playful cat",
    "art": "        _     _\n       /\\`-\"-`/\\\n       )` _ _ `(\n   (`\\ |=  Y  =|\n    ) )_\\  ^  /_\n   ( (/ ;`-u-`; \\\n    \\| /       \\ |\n     \\ \\_ \\ / _/ /\njgs  (,(,,)~(,,),)",
    "artist": "Joan G. Stark (jgs)",
    "source": "https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats",
    "license": "Personal use; keep the jgs signature",
    "licenseUrl": "https://oldcompcz.github.io/jgs/joan_stark/please.html"
  },
  {
    "title": "Cat on tiptoe",
    "art": "  (\\\n   ))         )\\\\\n  ((         /  .(\n   \\\\.-\"```\"'` =_/=\n    >  ,       /\n    \\   )__.\\ |\n     > / /  ||\\\\\njgs  \\\\ \\\\  \\\\ \\\\\n      `\" `\" `\"  `\"",
    "artist": "Joan G. Stark (jgs)",
    "source": "https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats",
    "license": "Personal use; keep the jgs signature",
    "licenseUrl": "https://oldcompcz.github.io/jgs/joan_stark/please.html"
  }
];

var invalid = `That's not a valid command! Type <span class='special'>help</span> for a list of commands.`;

var prompts = {
	help: help,
  unformatted_intro: unformatted_intro,
  intro: intro,
  bio: bio,
  social: social,
  portfolio: portfolio,
  contact: contact,
  pgp: pgp,
  cats: cats,
	invalid: invalid
};
