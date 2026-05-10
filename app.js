const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const html = document.documentElement;
const langBtn = $('#lang-btn'), themeBtn = $('#theme-btn');
const sLang = localStorage.getItem('in-lang') || 'en';
const sTheme = localStorage.getItem('in-theme') || 'dark';
html.setAttribute('data-lang', sLang); html.setAttribute('data-theme', sTheme);
langBtn.textContent = sLang === 'en' ? 'EN' : '中';
langBtn.addEventListener('click', () => { const n = html.getAttribute('data-lang') === 'en' ? 'zh' : 'en'; html.setAttribute('data-lang', n); localStorage.setItem('in-lang', n); langBtn.textContent = n === 'en' ? 'EN' : '中'; });
themeBtn.addEventListener('click', () => { const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; html.setAttribute('data-theme', n); localStorage.setItem('in-theme', n); });

$('#hero-viz').innerHTML = `<svg viewBox="0 0 540 540" xmlns="http://www.w3.org/2000/svg">
  ${(() => { const cols = ['#ffb04d','#5fdcff','#5fbf99','#ff7355','#a87aff','#ffd06a']; const positions = [{x:270,y:120},{x:430,y:200},{x:400,y:380},{x:270,y:450},{x:140,y:380},{x:110,y:200}]; let out = ''; for (let i = 0; i < positions.length; i++) for (let j = i+1; j < positions.length; j++) { out += `<line x1="${positions[i].x}" y1="${positions[i].y}" x2="${positions[j].x}" y2="${positions[j].y}" stroke="${cols[i]}" stroke-opacity="${0.15 + (Math.abs(i - j) > 2 ? 0.1 : 0.25)}" stroke-width="${Math.abs(i - j) > 2 ? 0.6 : 1.2}"/>`; } positions.forEach((p, i) => { out += `<circle cx="${p.x}" cy="${p.y}" r="22" fill="${cols[i]}" opacity="0.85"/><circle cx="${p.x}" cy="${p.y}" r="38" fill="${cols[i]}" opacity="0.18"/>`; }); return out; })()}
  <text x="270" y="510" text-anchor="middle" font-family="Geist Mono" font-size="11" fill="var(--muted)" letter-spacing="3">DISTRIBUTED INTELLIGENCE · 6 NODE TYPES</text>
</svg>`;

const nodes = [
  { id: 'lab',     en_n: 'Labs',           zh_n: '实验室',     en_d: 'university and corporate research labs. Slow, durable, credentialed; bottleneck is grant cycles and tenure incentives.', zh_d: '大学与企业研究实验室。慢、耐久、有资质；瓶颈是经费周期与终身职位激励。' },
  { id: 'indiv',   en_n: 'Individuals',    zh_n: '个人',       en_d: 'independent researchers, retired specialists, hobbyist polymaths. Rising in influence as AI tools lower their per-capita compute and reach barriers.', zh_d: '独立研究者、退休专家、爱好者通才。随着 AI 工具降低人均算力与触达壁垒，影响力上升。' },
  { id: 'agentic', en_n: 'Agentic Clusters', zh_n: '代理式集群', en_d: 'AI agents running automated literature review, hypothesis generation, simulation. Real but currently shallow; the genre over-projects this node by 5x.', zh_d: '运行自动文献综述、假设生成、模拟的 AI 代理。真实但当前肤浅；类型把此节点过度投射 5 倍。' },
  { id: 'archive', en_n: 'Archives',       zh_n: '档案',       en_d: 'arXiv, Wikipedia, PubMed, GitHub, the long tail of open repositories. Foundational; the substrate the others depend on; under-resourced relative to load.', zh_d: 'arXiv、维基百科、PubMed、GitHub、开放仓库长尾。基础性；其他节点依赖的底层；相对负载资源不足。' },
  { id: 'sim',     en_n: 'Simulators',     zh_n: '模拟器',     en_d: 'climate, biology, materials, particle physics simulation infrastructure. Hugely expensive, run by a small set of institutions, increasingly couples with agentic clusters.', zh_d: '气候、生物、材料、粒子物理模拟基础设施。极昂贵，由小型机构集合运行，与代理式集群日益耦合。' },
  { id: 'gov',     en_n: 'Governance Councils', zh_n: '治理理事会', en_d: 'standards bodies, ethics councils, model-evaluation networks. Catching up; visibly behind the pace of capability change.', zh_d: '标准机构、伦理理事会、模型评估网络。在追赶；可见地落后于能力变化的速率。' },
];

function renderNodes() {
  $('#node-grid').innerHTML = nodes.map(n => `<div class="card"><div class="card-tag">${n.id}</div><h3><span lang="en">${n.en_n}</span><span lang="zh">${n.zh_n}</span></h3><p><span lang="en">${n.en_d}</span><span lang="zh">${n.zh_d}</span></p></div>`).join('');
}
renderNodes();

const probes = [
  { id: 'where-from', en_t: 'Where Knowledge Comes From', zh_t: '知识从何而来',
    en_h: 'Where does new knowledge actually come from now?', zh_h: '新知识现在实际从何而来？',
    en_a: `From a coupling of three node types that the genre rarely names together.

(1) Archives + agentic clusters. Most novel synthesis in 2026 is being produced by AI agents running over open archives at higher comprehensiveness than any individual or lab can match. The output is uneven — much of it shallow, some of it real — but the cumulative volume is now non-trivial. The genre under-credits this because the outputs are not glossy.

(2) Individuals + simulators. The single biggest under-credited pattern: independent researchers who can now afford simulator access (rented compute, open biology platforms, climate data APIs) producing work that would have required a lab in 2010. The bottleneck moved from access to attention; the individuals who succeed are those who can manage attention against a flood of available data.

(3) Labs + governance. The slow, durable production of credentialed knowledge has not stopped — it has become more important as a filter. The labs producing peer-reviewed structural results are now the ground truth against which the faster nodes calibrate; the genre often dismisses labs as obsolete, which is exactly backwards.

The honest read. The intelligence network has moved from "labs at the center, everyone else at the periphery" to "archives at the center, all six node types coupled." This is a structural change in how knowledge is produced, and it is happening faster than any individual node-type analysis captures.

What this engine refuses to pretend: that one node type is winning. None is; the coupling is the win, and the institutions that adapt their relationship to the network are the ones that thrive.`,
    zh_a: `来自类型很少一起命名的三种节点类型的耦合。

(1) 档案 + 代理式集群。2026 年多数新颖综合正由 AI 代理在开放档案上以"任何个人或实验室都无法匹配的全面性"产出。输出不均——许多肤浅，某些真实——但累积体量现在已非微不足道。类型欠功归因于此因为输出不光鲜。

(2) 个人 + 模拟器。最大的欠功归因模式：现在能负担模拟器访问（租用算力、开放生物学平台、气候数据 API）的独立研究者，产出在 2010 年需要实验室的工作。瓶颈从访问转移到注意；成功的个人是能在可得数据洪流中管理注意的人。

(3) 实验室 + 治理。资质化知识的缓慢、耐久产出没有停止——它作为过滤器变得更重要。产出同行评审结构性结果的实验室，现在是更快节点校准其参照的"地面真相"；类型常把实验室斥为过时，这恰好相反。

诚实读法。智能网络从"实验室在中心、其他人在外围"移到"档案在中心、六种节点全部耦合"。这是知识如何被产出的结构性变化，正以"任何单一节点类型分析都无法捕获"的速度发生。

本引擎拒绝假装的事：一种节点类型在赢。没有；耦合是赢，调整其与网络关系的机构是繁荣的那些。` },
  { id: 'agentic-real', en_t: 'Agentic Clusters Reality', zh_t: '代理式集群现实',
    en_h: 'Are AI research agents actually producing real research?', zh_h: 'AI 研究代理实际上在产出真正的研究吗？',
    en_a: `Yes for narrow tasks, no for novel synthesis, and the discourse conflates the two.

What is real. AI agents perform extremely well at: literature review across thousands of papers, hypothesis enumeration within an established framework, simulation parameter sweeps, code generation for standard analysis pipelines, paper-to-paper consistency checking, summarisation across domains. These are the routine tasks of research and AI agents now do them faster, often better, than human researchers operating without them. The productivity gain is real and underestimated.

What is not real. AI agents produce shallow work when the task requires: forming a question that did not exist before, judging which empirical anomaly is worth chasing, weighing hidden methodological flaws against headline results, integrating insight across disciplines without prompting, recognising when an established framework is the constraint. These are the high-leverage parts of research and AI agents are currently far below the median graduate student on them.

The pattern that confuses the genre. The visible output of agentic research is the sum of what AI does well + what its human supervisor does well; the visible output looks more capable than the AI alone is. Demos that show AI agents producing research are nearly always demos of well-supervised agents. Unsupervised agents at the current frontier produce well-formatted shallow work that fails to land in any real research community.

The honest projection. The narrow-task gain compounds into real research productivity through the supervisors who use it; the novel-synthesis gap is closing slowly and is unlikely to close in the next 3-5 years for reasons that are structural (taste, judgment, embodied knowledge of the field) rather than computational. The genre often projects this closure aggressively; the data does not yet support the projection.

What this engine refuses to pretend: that the question is settled in either direction. It is not; the answer is moving and the moving is itself the interesting part.`,
    zh_a: `对窄任务是，对新颖综合不是，话语混淆两者。

真实的事。AI 代理在以下方面表现极佳：跨数千篇论文的文献综述、在既有框架内的假设枚举、模拟参数扫描、为标准分析管线生成代码、论文到论文的一致性检查、跨领域摘要。这些是研究的例行任务，AI 代理现在比无其的人类研究者做得更快、常更好。生产率收益真实且被低估。

不真实的事。当任务要求时 AI 代理产出肤浅工作：形成一个之前不存在的问题、判断哪个经验异常值得追、权衡隐藏的方法论缺陷对头条结果、不经提示地跨学科整合洞见、识别既有框架本身是约束。这些是研究的高杠杆部分，AI 代理当前远低于中位数研究生。

混淆类型的模式。代理式研究的可见输出是 AI 做得好的 + 其人类监督做得好的之和；可见输出看起来比 AI 单独的更有能力。展示 AI 代理产出研究的演示几乎总是良好监督代理的演示。当前前沿的无监督代理产出格式良好但肤浅的工作，无法落地于任何真实研究社区。

诚实投射。窄任务收益通过使用它的监督者复合为真实研究生产率；新颖综合差距缓慢缩小，未来 3–5 年不太可能闭合，原因是结构性的（品味、判断、领域具身知识）而非计算性的。类型常激进投射此闭合；数据尚未支持投射。

本引擎拒绝假装的事：问题在任一方向被定论。它没有；答案在移动，移动本身就是有趣的部分。` },
  { id: 'individual-rise', en_t: 'Individual Rise', zh_t: '个人崛起',
    en_h: 'Why are individual researchers becoming more powerful in this network?', zh_h: '为何个人研究者在此网络中变得更强？',
    en_a: `Three structural reasons, and one important counter-current.

(1) Compute access has democratised. A 2026 individual with a credit card can rent compute at scales that required a university account in 2015 and a lab in 2005. The capital barrier collapsed across one decade; the genre has not fully digested the implications.

(2) AI tooling raises the per-capita ceiling. A skilled individual using current AI tools produces work output equivalent to a 3–5 person research team of 2015. Not in every domain — physical experimentation still requires bodies and labs — but in computational/analytical domains, the multiplier is real and compounding.

(3) Distribution costs collapsed. Once an individual produces work, distributing it (preprint, blog, repository, video) is essentially free and reach-equivalent to institutional channels. This was not true in 1995, was partially true in 2010, is fully true in 2026.

The counter-current. Individual researchers face one structural disadvantage that has not improved: peer-network credibility transfer. A paper from a known lab gets read by senior people in the field; the equivalent paper from an independent researcher gets read by a smaller, often less senior network. Reputation accrues faster inside institutions because the institution does part of the credibility work for you. Independent researchers can produce the work but find it harder to land it.

The honest synthesis. The intelligence network has moved partway toward individual empowerment and not the whole way. Individuals can produce the work; institutions still mediate where it lands. The next decade is likely to see further democratisation of distribution (newer credibility-transfer mechanisms, AI-mediated peer review, reputation systems that survive across institutions), but the binding constraint will be social, not technical. The work to do is in the social architecture; the technical pieces are largely solved.

What this engine refuses to pretend: that individuals will fully replace institutions. They will not; the network needs both. The shift is in the ratio, not the existence.`,
    zh_a: `三个结构原因，与一个重要逆流。

(1) 算力访问已民主化。2026 年带信用卡的个人可以在 2015 年需要大学账户、2005 年需要实验室的规模上租用算力。资本壁垒在一个十年内坍塌；类型尚未完全消化意涵。

(2) AI 工具提升人均上限。使用当前 AI 工具的熟练个人产出的工作输出等同于 2015 年的 3–5 人研究团队。不在每个领域——物理实验仍需要身体与实验室——但在计算/分析领域，乘数真实且复利。

(3) 分发成本坍塌。一旦个人产出工作，分发它（预印本、博客、仓库、视频）实质免费、触达等同于机构渠道。这在 1995 年不真，2010 年部分真，2026 年完全真。

逆流。个人研究者面对一个未改善的结构劣势：同行网络信誉转移。已知实验室的论文被领域资深人士阅读；独立研究者的等效论文被更小、常更不资深的网络阅读。声誉在制度内累积更快，因为制度替你做了部分信誉工作。独立研究者能产出工作但发现更难让它落地。

诚实综合。智能网络已部分朝向个人赋权、未走完全程。个人能产出工作；制度仍中介它落到哪里。下个十年很可能见到进一步的分发民主化（更新的信誉转移机制、AI 中介的同行评审、跨机构幸存的声誉系统），但约束性约束将是社会的，不是技术的。要做的工作在社会架构里；技术部分大体已解决。

本引擎拒绝假装的事：个人会完全替代机构。他们不会；网络两者都需要。位移在比例上，不在存在上。` },
  { id: 'governance-lag', en_t: 'Governance Lag', zh_t: '治理滞后',
    en_h: 'Why is governance always behind the network it is meant to govern?', zh_h: '为何治理总落后于其本应治理的网络？',
    en_a: `Three structural reasons, in declining order of fixability.

(1) Information lag. Governance bodies process information through formal review cycles that move on quarterly-to-annual timescales; the network they oversee moves on weekly-to-monthly timescales. By the time governance has formed a position on capability X, capability Y has shipped. The lag is structural; it can be partially closed by including more frontier-network participants in governance, which is happening slowly.

(2) Legitimacy lag. Governance bodies derive their authority from existing institutional architectures (universities, professional societies, treaties) that themselves move slowly. Even when individual governance participants understand the frontier, the bodies they sit on cannot move at the frontier\'s pace without losing legitimacy with the wider institutions they answer to. The lag is partly fixable by reforming the institutions; the reform itself is slow.

(3) Skill lag. The skill set required to govern AI-mediated research is not the skill set governance bodies have historically selected for. The bodies are populated by senior figures from the previous era of research, not from the emerging era. This is partly a generational issue and partly a structural one (selection committees prefer credentials that point backward); fully fixable only over a generation.

The honest position. Governance lag is partially fixable, partially generational, and partially permanent (some lag is irreducible because deliberation requires time). The genre often demands that governance "catch up"; the demand is unrealisable in full. The relevant question is not "how do we close the gap" but "how do we keep the gap from compounding into catastrophe in the meantime."

The realistic intervention. Build interstitial governance structures — lighter, faster, more frontier-aware bodies that sit between formal governance and the network — that can flag emerging issues for formal governance before they bind. This is happening through evaluation networks, red-team consortia, model-cards, and similar; it is the most productive governance work currently underway and the genre under-covers it.

What this engine refuses to pretend: that the lag can be eliminated. It cannot. The network and its governance are running on different physical clock speeds; the goal is coupling, not synchrony.`,
    zh_a: `三个结构原因，按可修复性递减。

(1) 信息滞后。治理机构通过在季度到年度时间尺度上移动的正式审查周期处理信息；其监督的网络在周到月时间尺度上移动。当治理对能力 X 形成立场时，能力 Y 已发布。滞后是结构性的；可以通过把更多前沿网络参与者纳入治理来部分缩小，这正在缓慢发生。

(2) 合法性滞后。治理机构的权威来自既有制度架构（大学、专业学会、条约），它们本身移动缓慢。即使个别治理参与者理解前沿，他们所坐的机构无法以前沿速率移动而不丢失对其负责的更广制度的合法性。滞后部分可通过改革制度修复；改革本身缓慢。

(3) 技能滞后。治理 AI 中介研究所需的技能集，不是治理机构历史上所选择的技能集。机构由先前研究时代的资深人物组成，不是涌现时代的。这部分是代际问题、部分是结构问题（选拔委员会偏好向后指的资质）；只能在一代人内完全修复。

诚实立场。治理滞后部分可修复、部分代际、部分永久（某些滞后是不可还原的，因为审议需要时间）。类型常要求治理"赶上"；该要求完全不可实现。相关问题不是"我们如何缩小差距"而是"我们在此期间如何防止差距复合为灾难"。

现实干预。建造间隙性治理结构——更轻、更快、更前沿觉知的机构，居于正式治理与网络之间——能在新出现的问题约束之前为正式治理标记之。这正通过评估网络、红队联盟、模型卡等发生；它是当前进行中最有产出的治理工作，类型欠覆盖。

本引擎拒绝假装的事：滞后可被消除。它不可。网络与其治理在不同物理时钟速度上运行；目标是耦合，不是同步。` },
  { id: 'how-to-participate', en_t: 'How to Participate', zh_t: '如何参与',
    en_h: 'How do I become a useful node in this network?', zh_h: '我如何成为此网络中的有用节点？',
    en_a: `Three categories of useful node, and one warning.

(1) Become a high-quality archive node. Maintain a public corpus — a blog, a repository, a documented dataset, a curated bibliography — that is good enough to be useful to other nodes. This is the single highest-leverage individual contribution, requires patience over years to compound, and is currently undervalued by the genre. Most useful work in the network depends on archive quality; producing or maintaining one is a load-bearing role.

(2) Become a calibration node. Specialise narrowly enough that you can credibly verify or falsify claims in your domain; offer that calibration to the wider network through review, replication, or critique. The network is starved for honest calibration nodes precisely because the agentic node-type produces volume that needs filtering. The role is unglamorous and increasingly important.

(3) Become a coupling node. Connect two adjacent communities that are not currently talking to each other; translate between their vocabularies; bring problems from one to the other. The network has structural gaps in coupling, especially between technical and humanistic domains; nodes that close these gaps have outsized impact relative to their visible output.

The warning. Do not try to become a "thought leader" node. The genre rewards the appearance of this role; the network mostly does not. Visible thought-leadership is downstream of being useful; trying to do the thought-leadership without the underlying contribution produces noise that the network filters out within months.

The honest reframe. Most readers asking this question are imagining a single-node role (be the smart person who has the take); the network rewards multi-node roles (the person who maintains the archive, calibrates the claims, and couples the communities). The trade is real; the multi-node path is more useful and less rewarded by status systems calibrated to the previous era.

What this engine refuses to pretend: that participation is easy or fast. Useful network participation accrues over 3–10 years and requires patience. The 6-month "build in public" cycle the genre sells produces visible activity, not durable value.`,
    zh_a: `三类有用节点，与一个警告。

(1) 成为高质量档案节点。维护一份公共语料——博客、仓库、文献化数据集、精选参考目录——好到对其他节点有用。这是最高杠杆的单一个人贡献，需要数年耐心以复利，当前被类型低估。网络中多数有用工作依赖档案质量；产出或维护一个是承重角色。

(2) 成为校准节点。专精得足够窄，使你能在领域内可信地验证或证伪主张；通过评审、重复、批评向更广网络提供这种校准。网络正饥渴于诚实校准节点，恰因代理式节点产出需要过滤的体量。角色不光鲜且日益重要。

(3) 成为耦合节点。连接两个当前彼此不交谈的相邻社区；翻译它们的词汇；把问题从一个带到另一个。网络在耦合上有结构性缺口，特别是技术与人文领域之间；闭合这些缺口的节点相对其可见输出有超比例影响。

警告。别试图成为"思想领袖"节点。类型奖励此角色的外观；网络多半不奖励。可见的思想领袖是"有用"的下游；不带底层贡献做思想领袖会产出网络在数月内过滤掉的噪声。

诚实重构。多数提问的读者在想象单节点角色（成为有看法的聪明人）；网络奖励多节点角色（维护档案、校准主张、耦合社区的人）。交易真实；多节点路径更有用，且被校准至先前时代的地位系统更少奖励。

本引擎拒绝假装的事：参与容易或快速。有用的网络参与在 3–10 年内累积、需要耐心。类型卖的 6 个月"公开建造"周期产出可见活动，不产出耐久价值。` },
];

function renderProbes() {
  $('#prompt-grid').innerHTML = probes.map(p => `<button class="prompt-btn" data-id="${p.id}"><span class="pt-tag">probe</span><strong><span lang="en">${p.en_t}</span><span lang="zh">${p.zh_t}</span></strong><div style="margin-top:6px; color: var(--muted); font-size: 12px;"><span lang="en">${p.en_h}</span><span lang="zh">${p.zh_h}</span></div></button>`).join('');
  $$('.prompt-btn').forEach(b => b.addEventListener('click', () => { const p = probes.find(x => x.id === b.dataset.id); const lang = html.getAttribute('data-lang'); $('#mirror-out').textContent = lang === 'en' ? p.en_a : p.zh_a; }));
}
renderProbes();

function heuristic(text) {
  const lang = html.getAttribute('data-lang');
  const t = text.toLowerCase();
  const found = [];
  for (const n of nodes) { const re = new RegExp(n.id + '|' + n.zh_n, 'i'); if (re.test(t)) found.push(n.en_n); }
  if (lang === 'en') return `Heuristic read · node types named: ${found.length ? found.join(' · ') : 'none flagged'}.\n\nThe canned probes above are cleaner than this fallback.`;
  return `启发式读取 · 命名的节点类型：${found.length ? found.join(' · ') : '无标记'}。\n\n上方的预设探针比这个回退更干净。`;
}
$('#mirror-go').addEventListener('click', () => { const text = $('#mirror-input').value.trim(); if (!text) return; $('#mirror-out').textContent = heuristic(text); });
