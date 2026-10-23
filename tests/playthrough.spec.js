const { test, expect } = require("@playwright/test");
const fs = require("fs");

const ART = "/opt/cursor/artifacts";
fs.mkdirSync(ART, { recursive: true });

const MUST = [
  "我是无人机小珠！请把这两个地点的高度写进记录本，我照着飞。",
  "板樟山山顶：比海平面高 274 米",
  "港珠澳大桥海底隧道最深处：比海平面低 46 米",
  "再看看卡片 A 写的是多少米",
  "再看看卡片 B 写的是多少米",
  "到了！✓",
  "隧道在哪？这里只有树……",
  "小珠为什么飞错了？",
  "A. 小珠的电池没电了",
  "B. 记录本上「高 46 米」和「低 46 米」都写成 46，小珠分不出来",
  "C. 46 这个数字算错了",
  "D. 隧道不在海平面以下",
  "对！数字只说了「多远」，没说「往哪边」。记录员需要一种记号，把「高于」和「低于」分开。",
  "小珠第一次飞到山顶时电池好好的。看看它在第二个地点时，是往哪个方向飞的？",
  "46 米这个数字本身没错，卡片 B 写的就是 46 米。问题出在别的地方：它往哪边飞了？",
  "卡片 B 写的是比海平面「低」46 米。那小珠为什么往上飞？",
  "你来当发明家：怎么改记录本，小珠就不会飞错？",
  "A. 在高于海平面的数前加「+」，低于海平面的数前加「−」",
  "B. 低于海平面的数用红笔写",
  "C. 低于海平面的数旁边写「下」字",
  "D. 以上都能帮人看懂，但小珠只读数字符号，最好选一种简单统一的记号",
  "说得好！B、C 也能让人看懂，但颜色和汉字要另作约定。数学家选了最简单的办法：在数前面加「+」或「−」。",
  "这正是数学家的办法！其实 B、C 也能让人看懂，但「+」「−」最简洁、最通用。",
  "这个办法人能看懂。不过小珠只读数字和符号，不认颜色和汉字，有没有更通用的记法？",
  "试试新键！重新记录卡片 B。",
  "卡片 B 是比海平面『低』，你按的是哪个符号？",
  "找到了！",
  "像 274、46 这样大于 0 的数叫正数（也可以写成 +274，读作「正二百七十四」）。",
  "在正数前面加上「−」的数，比如 −46，叫负数，读作「负四十六」。",
  "在这张图里，0 就是海平面：比它高记正，比它低记负。",
  "（课本里的准确说法，请以学校发的书为准。）",
  "收入 200 元",
  "支出 80 元",
  "气温零上 15 ℃",
  "气温零下 3 ℃",
  "比海平面高 274 米",
  "比海平面低 46 米",
  "向东走 300 米",
  "向西走 120 米",
  "水位上涨 0.5 米",
  "水位下降 0.3 米",
  "小店盈利 1000 元",
  "小店亏损 600 元",
  "这两张说的是同一类事吗？先找同一类，再看方向是不是相反。",
  "你发现了吗？每一对都是同一类量，方向相反。注意：两边的数不必一样大。",
  "「向东走 3 千米」和「向北走 3 千米」是相反意义的量吗？",
  "对。东的反面是西，不是北。",
  "东和北是相反的方向吗？想想指南针。",
  "「收入 50 元」和「支出 50 元」是相反意义的量吗？",
  "对。同一类（钱的流动），方向相反（进和出）。",
  "钱一个是进口袋，一个是出口袋，方向一样吗？",
  "「身高 150 厘米」和「体重 40 千克」是相反意义的量吗？",
  "对。它们根本不是同一类量。",
  "相反意义的量首先要是同一类。身高和体重是同一类吗？",
  "「+」号说明它在哪一边？",
  "没有符号的 3，和 +3 一样吗？",
  "看它前面的符号。",
  "0 比 0 大吗？比 0 小吗？",
  "小数也可以带负号。看前面的符号。",
  "2.7 比 0 大还是小？",
  "分数前面也能加负号。",
  "分数带「+」号，它在哪一边？",
  "很大的数也一样，它比 0 大吗？",
  "数字大小不决定正负，看符号。",
  "板樟山有 1999 级台阶哦",
  "大于 0 的数是正数，「+」号可以省略：3 就是 +3。",
  "带「−」号的是负数，小数、分数也可以是负数。",
  "0 既不是正数，也不是负数，它是正数和负数的分界线。",
  "−46 怎么读？",
  "减四十六",
  "负四十六",
  "少四十六",
  "对，表示「负数」的这个符号读「负」。",
  "这里的「−」不是在做减法（前面没有被减数），它说明这个数是哪一类？",
  "+0.5 怎么读？",
  "加零点五",
  "正零点五",
  "零点五加",
  "对，「+」在这里读「正」。",
  "这里不是加法算式，「+」号是在说明这个数的身份。",
  "小明说：「0 是最小的正数。」你同意吗？",
  "A. 同意，0 很小",
  "B. 不同意，0 既不是正数也不是负数，它是分界",
  "C. 不同意，最小的正数是 1",
  "说得好。0 是「基准」，正数在它的一边，负数在另一边。",
  "正数要「大于 0」。0 比 0 大吗？",
  "0.5、0.1 比 1 小，它们也是正数。而且这道题的关键在 0 本身：0 是正数吗？",
  "现在换个规定！",
  "中午水位比早上上涨了 0.6 米，记作？",
  "对。上涨是我们规定的正方向。",
  "看看顶部规定：上涨记什么号？",
  "傍晚水位比早上下降了 0.4 米，记作？",
  "对。和规定方向相反，就记负。",
  "下降和规定的「上涨」方向一样吗？",
  "某一刻水位正好和早上一样，记作？",
  "对。和基准一样，就是 0。",
  "既没涨也没降，离基准有多远？",
  "同样是「中午水位上涨了 0.6 米」，在新规定下记作？",
  "对！事实没变，规定变了，记号就跟着反过来。",
  "现在规定的是哪个方向记 +？上涨还是那个方向吗？",
  "两种规定下，同一件事一个记 +0.6，一个记 −0.6。哪句话说得对？",
  "A. 有一种规定是错的",
  "B. 两种都对，只要事先说清楚「0 是什么、哪边算正」",
  "C. 记 + 的那种才对，因为上涨是好事",
  "对。正负号表示的是相对于约定的方向，所以记录前一定要先写清规定。",
  "两种规定描述的是同一个事实吗？那它能算「错」吗？",
  "正负和「好事坏事」无关。如果规定下降记 +，下降就记正。",
  "规定：钱进家门记 +，钱出家门记 −。",
  "交电费 320 元，记作？",
  "对，钱出去了。",
  "交电费时，钱是进家门还是出家门？",
  "卖旧书收入 35 元，记作？",
  "这笔钱是进来还是出去？",
  "比海平面高约 274 米",
  "小珠飞上山顶！（据报道约 274 米）",
  "「高于海平面」在 0 线的上面还是下面？离 0 有多远？",
  "比海平面低 46 米",
  "小珠钻进了隧道！",
  "「低于海平面」应该在 0 线哪一侧？",
  "比海平面高 3 米（示例数字）",
  "对，略高于海平面。",
  "只高一点点，离 0 线近还是远？",
  "在海面下 12 米（示例数字）",
  "「海面下」是哪一侧？",
  "这根尺子上，0 代表什么？",
  "A. 什么都没有",
  "B. 海平面，是我们选的基准",
  "C. 最低的地方",
  "对。0 不是「没有」，而是我们选定的起点。上面记正，下面记负。",
  "海平面那里有东西吗？0 在这里是用来做什么的？",
  "隧道比 0 还低，0 是最低的吗？",
  "工厂规定某零件直径「20±0.2 mm」，意思是标准 20 mm，最多可以大 0.2 mm、最多可以小 0.2 mm。（示例数字。课本「阅读与思考」的原例请以实发课本为准。）",
  "直径合格的范围是？",
  "A. 19.8 到 20.2 mm",
  "B. 20 到 20.2 mm",
  "C. 19.6 到 20.4 mm",
  "对。以 20 为基准，往大、往小各 0.2。",
  "「±」表示两个方向都允许，各允许多少？",
  "一个零件量出来 20.3 mm，合格吗？",
  "对，大了 0.3，超过了允许的 0.2。",
  "它比 20 大了多少？允许大多少？",
  "为什么人们需要负数？",
  "A. 因为数不够大",
  "B. 为了区分方向相反的同类量，比如高于和低于海平面",
  "C. 为了计算更快",
  "对，这正是小珠飞错的原因。",
  "回想第 0 关：小珠只看到 46，它缺的是哪个信息？",
  "下面哪一对是相反意义的量？",
  "A. 向南 5 米和向北 2 米",
  "B. 上升 3 层和向东 3 米",
  "C. 收入 10 元和体重 10 千克",
  "对，同一类量，方向相反，数不必相等。",
  "先看是不是同一类，再看方向是否相反。",
  "如果「零上 5 ℃」记作 +5 ℃，那么「零下 7 ℃」记作？",
  "零上记 +，那零下和它是什么关系？",
  "下面哪些是负数？ 5, −1.5, 0, −3/4, +2, −100",
  "全对！小数、分数、大数都可以是负数。",
  "看每个数前面的符号；0 归哪一类？",
  "「+8」和「8」是什么关系？",
  "A. 同一个数，「+」可以省略",
  "B. +8 比 8 大",
  "C. 8 不是正数",
  "8 比 0 大吗？那它是什么数？前面的「+」改变大小了吗？",
  "「0 是负数。」",
  "对，0 既不是正数也不是负数。",
  "负数要比 0 小。0 比 0 小吗？",
  "规定向东走记为正。小华向西走了 60 米，记作？",
  "西和规定的正方向是什么关系？",
  "规定「水位下降」记为正。水位上涨 0.2 米，记作？（示例数字）",
  "对！规定反过来，记号也反过来。",
  "这次规定的是哪个方向记 +？",
  "把记录一个实际量的步骤排好顺序：①写出带符号的数　②说清 0 代表什么（基准）　③规定哪个方向为正",
  "①写出带符号的数",
  "②说清 0 代表什么（基准）",
  "③规定哪个方向为正",
  "对。先定基准和方向，再写数。",
  "小珠飞错，就是因为一开始没有说清楚哪件事？",
  "小林说：「−46 米表示隧道深度是负的，所以没有深度。」哪句反驳最好？",
  "A. 他说得对",
  "B. −46 表示在海平面以下 46 米，「−」说的是方向，46 说的是距离",
  "C. 负数都没有意义",
  "说得好：符号管方向，数字管多远。",
  "回到海拔尺：−46 的图标在哪？离 0 线有多远？",
  "「50±1 克」的合格范围是？（示例数字）",
  "A. 49–51 克",
  "B. 50–51 克",
  "C. 48–52 克",
  "记录员认证通过！你已经能给小珠写清楚任何高度了。",
  "快通过了！点下面的关卡回看一下，再来一次。",
  "没关系，先回第 0 关看小珠为什么飞错，再慢慢来。",
  "一次答对 ★，重试后答对 ☆（空心）。星星只显示，不排名、不限时。",
  "孩子是「珠海海拔记录员」，要帮无人机「小珠」建一份珠海高度地图。小珠只认记录本上的数字，记录本写成什么，它就飞到哪里。第一关就会出错：小珠把海底隧道当成了半山腰。孩子得发明一种记法，让小珠不再飞错。",
  "约 30–35 分钟（第 0–4 关约 22 分钟，小测约 8 分钟，第 5 关加分关可选 3 分钟）。可以分两次玩，进度自动保存。",
  "只需要一台 iPad 或手机浏览器，不需要教具、纸笔和网络（首次加载后可离线）。",
  "不要先讲「负数」两个字。打开前只问一句：「你知道板樟山多高吗？港珠澳大桥的海底隧道呢？」",
  "把平板交给孩子，家长坐在旁边。孩子卡住时，只问「你觉得问题出在哪？」，不直接给答案。",
  "玩完后，请孩子用一句话向家长「教」一遍：为什么要有负数。这是自我解释，比家长讲一遍更有效。",
  "间隔复习：第 2 天和第 7 天各打开一次「复习」按钮（3 道随机题，见 §7），每次约 2 分钟。",
  "等孩子能用自己的话讲清「为什么需要负数」后再看。平时不占用兴趣时间。",
  "「如果……记作 +a，那么……记作？」这是最常见的题型。先找题目里的「规定」，再判断方向是否相反。",
  "「下列各数中，正数有几个、负数有几个」常见陷阱：0 不算正数也不算负数；省略「+」的数也是正数；带「−」的分数、小数也是负数。",
  "「标准质量 ±」类来自课本「阅读与思考」的允许偏差，考查读懂「±」的范围。",
  "相反意义的量判断题先看是否同一类，再看方向是否相反，数值不必相等。",
  "超出本节的内容：比如「−(−3) 是正数还是负数」「|−5|」，属于后面的相反数、绝对值，这一课不练。",
  "3 题答对 "
];

test("lesson file copies the design verbatim", () => {
  const html = fs.readFileSync("math7a-1-1/index.html", "utf8");
  expect(html.includes("数轴")).toBe(false);
  expect(html.includes("漏选或多选时")).toBe(false);
  for (const s of MUST) expect(html, s).toContain(s);
  expect(html).toContain("写出带符号的数\u3000②");
  expect(html).toContain("（基准）\u3000③");
  expect(html).toContain("49\u201351");
  expect(html).toContain("30\u201335");
  expect(html).toContain("第 0\u20134 关");
  expect(html).toContain("这里只有树\u2026\u2026");
  expect(html).toContain('content="width=device-width, initial-scale=1, viewport-fit=cover"');
  expect(html).toContain('const LESSON = {');
});

test("grading, review picker, and catalog", async ({ page }) => {
  const external = [];
  page.on("request", (req) => {
    const url = req.url();
    if (url.startsWith("data:") || url.startsWith("blob:")) return;
    if (!url.startsWith("http://127.0.0.1:4173")) external.push(url);
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("趣学");
  await expect(page.locator("#status")).toHaveText("还没开始");
  await page.screenshot({ path: ART + "/home-phone.png" });
  await page.locator("a.card").click();
  await expect(page).toHaveURL(/\/math7a-1-1\/?$/);
  await expect(page.locator("h1")).toHaveText("珠海海拔记录员");
  await expect(page.locator("#sound-btn")).toHaveAttribute("aria-pressed", "false");
  const result = await page.evaluate(() => {
    const L = window.__ZH__.LESSON;
    const g = window.__ZH__.gradeInput;
    const find = (id) => {
      for (const lv of L.levels) {
        const s = lv.steps.find((x) => x.id === id);
        if (s) return s;
      }
      return L.quiz.find((q) => q.id === id);
    };
    const q3 = find("Q3");
    const up = find("L3-q1");
    const zero = find("L3-q3");
    const b2 = find("L0-b2");
    const fee = find("L3-q6");
    const book = find("L3-q7");
    const cases = {
      q3a: g(q3, "-7").ok,
      q3b: g(q3, "−7℃").ok,
      q3c: g(q3, " −7 ℃").ok,
      q3d: g(q3, "7").ok,
      up: g(up, "0.6").ok && g(up, "+0.6").ok && !g(up, "−0.6").ok,
      zero: g(zero, "0").ok && g(zero, "+0").ok && !g(zero, "−0").ok,
      b2a: g(b2, "46").message,
      b2b: g(b2, "+46").message,
      b2c: g(b2, "−46").ok && g(b2, "-46").ok,
      b2d: g(b2, "10").message,
      fee: g(fee, "−320").ok && !g(fee, "320").ok,
      book: g(book, "35").ok && g(book, "+35").ok && g(book, "35元").ok
    };
    let seed = 7;
    const disjoint = [];
    for (let n = 0; n < 40; n++) {
      const rand = () => {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        return seed / 2147483648;
      };
      const picked = window.__ZH__.pickReview(L.quiz, rand);
      const kps = picked.flatMap((q) => q.kp);
      disjoint.push(picked.length === 3 && new Set(kps).size === kps.length && picked.every((q) => !q.optional));
    }
    return { cases, disjoint: disjoint.every(Boolean) };
  });
  expect(result.cases).toEqual({
    q3a: true, q3b: true, q3c: true, q3d: false, up: true, zero: true,
    b2a: "卡片 B 是比海平面『低』，你按的是哪个符号？",
    b2b: "卡片 B 是比海平面『低』，你按的是哪个符号？",
    b2c: true,
    b2d: "再看看卡片 B 写的是多少米",
    fee: true, book: true
  });
  expect(result.disjoint).toBe(true);
  expect(external).toEqual([]);
});

function formatSigned(v) {
  if (v > 0) return "+" + v;
  if (v < 0) return "−" + Math.abs(v);
  return "0";
}

async function getStep(page) {
  return page.evaluate(() => {
    const id = document.body.dataset.step;
    const L = window.__ZH__.LESSON;
    for (const lv of L.levels) {
      const s = lv.steps.find((x) => x.id === id);
      if (s) return s;
    }
    return L.quiz.find((q) => q.id === id) || null;
  });
}

function wrongIndex(step) {
  const correct = Array.isArray(step.correct) ? step.correct : [step.correct];
  for (let i = 0; i < step.options.length; i++) if (correct.indexOf(i) === -1) return i;
  throw new Error("no wrong option for " + step.id);
}

function rightIndex(step) {
  return Array.isArray(step.correct) ? step.correct[0] : step.correct;
}

function feedbackOf(step, index, ok) {
  const bag = ok ? step.feedback.correct : step.feedback.wrong;
  return typeof bag === "string" ? bag : bag[index];
}

async function assertNoAsciiMinus(page) {
  const hits = await page.evaluate(() => {
    const roots = ["#main", "header", "#feedback", "#modal"].map((s) => document.querySelector(s)).filter(Boolean);
    const found = [];
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        const t = n.nodeValue || "";
        if (/(^|[^\d])-(?=\d)/.test(t)) found.push(t.trim().slice(0, 80));
      }
    });
    return found;
  });
  expect(hits).toEqual([]);
}

async function assertLayout(page) {
  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const shell = document.querySelector(".shell");
    const shellWidth = shell ? shell.getBoundingClientRect().width : 0;
    const nodes = [...document.querySelectorAll(".tap")].filter((el) => {
      if (el.closest("[hidden]")) return false;
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden") return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    const boxes = nodes.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.x, y: r.y, w: r.width, h: r.height,
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 24)
      };
    });
    const small = boxes.filter((b) => b.w < 47 || b.h < 47).map((b) => b.label + " " + Math.round(b.w) + "x" + Math.round(b.h));
    const overlaps = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ix > 2 && iy > 2) overlaps.push(a.label + " ~ " + b.label);
      }
    }
    function gapOf(a, b) {
      const sepX = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w));
      const sepY = Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h));
      if (sepX < 0 && sepY < 0) return 0;
      if (sepX < 0) return sepY;
      if (sepY < 0) return sepX;
      return Math.hypot(sepX, sepY);
    }
    const tight = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const gap = gapOf(boxes[i], boxes[j]);
        if (gap < 7.5) tight.push(boxes[i].label + " ~ " + boxes[j].label + " (" + gap.toFixed(1) + "px)");
      }
    }
    const main = document.getElementById("main");
    const feedbackOpen = !document.getElementById("feedback").hidden;
    const modalOpen = !document.getElementById("modal").hidden;
    const step = document.body.dataset.step || "";
    const requireFit = window.innerHeight >= 800 && document.body.dataset.screen === "level" &&
      (document.body.dataset.level === "L0" || step === "L3-q4");
    return {
      overflow: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      shellWidth,
      landscape: window.innerWidth > window.innerHeight,
      small,
      overlaps,
      tight,
      feedbackOpen,
      modalOpen,
      requireFit,
      overflowY: main.scrollHeight - main.clientHeight,
      step
    };
  });
  expect(result.overflow, JSON.stringify(result)).toBe(false);
  expect(result.small, JSON.stringify(result.small)).toEqual([]);
  if (!result.feedbackOpen && !result.modalOpen) {
    expect(result.overlaps, JSON.stringify(result.overlaps)).toEqual([]);
    expect(result.tight, JSON.stringify(result.tight)).toEqual([]);
  }
  if (result.landscape) expect(result.shellWidth).toBeLessThanOrEqual(720.5);
  if (result.requireFit) expect(result.overflowY, result.step + " scrolls " + result.overflowY).toBeLessThanOrEqual(1);
}

async function assertExamples(page, step) {
  const tags = page.locator(".example-tag");
  const n = await tags.count();
  for (let i = 0; i < n; i++) await expect(tags.nth(i)).toHaveText("示例数字");
  if (n) {
    await expect(tags.first()).toHaveCSS("font-size", "12px");
    await expect(tags.first()).toHaveCSS("color", "rgb(107, 107, 107)");
  }
  if (step.type === "dragMatch") {
    expect(await page.locator("[data-example-prompt]").count()).toBeGreaterThan(0);
    expect(await page.locator("[data-real] .example-tag").count()).toBe(0);
    expect(await page.locator('[data-real="1"]').count()).toBe(2);
    return;
  }
  if (step.example) {
    expect(await page.locator("[data-example-prompt]").count()).toBeGreaterThan(0);
    expect(n).toBeGreaterThan(0);
  } else {
    expect(n).toBe(0);
  }
}

async function assertNoShuzhou(page) {
  const level = await page.locator("body").getAttribute("data-level");
  if (level !== "L4") return;
  const text = await page.evaluate(() => {
    return ["#main", "header", "#feedback", "#modal"].map((s) => {
      const el = document.querySelector(s);
      return el ? el.textContent : "";
    }).join("\n");
  });
  expect(text.includes("数轴")).toBe(false);
}

async function shotFeedback(page, name) {
  if (!name) return;
  await page.locator("#feedback .panel").evaluate(async (el) => {
    await Promise.all(el.getAnimations().map((a) => a.finished));
  });
  await page.screenshot({ path: name });
}

async function typeDigits(page, text) {
  for (const ch of text) {
    if (ch === "−" || ch === "-") await page.locator('[data-key="−"]').click();
    else if (ch === "+") await page.locator('[data-key="+"]').click();
    else if (ch === ".") await page.locator('[data-key="."]').click();
    else await page.locator('[data-key="' + ch + '"]').click();
  }
  await page.locator('[data-key="ok"]').click();
}

async function dragTo(page, source, target) {
  await source.scrollIntoViewIfNeeded();
  await target.scrollIntoViewIfNeeded();
  const s = await source.boundingBox();
  const t = await target.boundingBox();
  if (!s || !t) throw new Error("drag box missing");
  const sx = s.x + Math.min(s.width / 2, 36);
  const sy = s.y + Math.min(s.height / 2, 24);
  const tx = t.x + Math.min(t.width / 2, 36);
  const ty = t.y + Math.min(t.height / 2, 24);
  await page.mouse.move(sx, sy);
  await page.mouse.down();
  await page.mouse.move(sx + 24, sy + 10, { steps: 4 });
  await page.mouse.move(tx, ty, { steps: 16 });
  await page.mouse.up();
}

async function setRuler(page, value) {
  const track = page.locator("#ruler-track");
  await track.scrollIntoViewIfNeeded();
  const box = await track.boundingBox();
  if (!box) throw new Error("no ruler");
  for (let delta = 0; delta <= 8; delta++) {
    const signs = delta === 0 ? [0] : [-1, 1];
    for (const sign of signs) {
      const t = (300 - value) / 360;
      const y = box.y + t * box.height + sign * delta;
      const vh = page.viewportSize().height;
      if (y < 70 || y > vh - 24) continue;
      await page.mouse.click(box.x + box.width / 2, y);
      const text = (await page.locator("#readout").innerText()).trim();
      if (text === formatSigned(value)) return;
    }
  }
  throw new Error("ruler stuck at " + (await page.locator("#readout").innerText()) + " wanted " + formatSigned(value));
}

async function dismiss(page, retry) {
  const btn = page.locator("#feedback-next");
  await expect(btn).toHaveText(retry ? "再想想" : "继续");
  await btn.click();
}

async function finishCorrectInput(page, step, shots) {
  if (step.feedback && step.feedback.correct) {
    await expect(page.locator("#feedback")).toHaveClass(/ok/);
    await expect(page.locator("#feedback-text")).toHaveText(step.feedback.correct);
    await expect(page.locator("#feedback.ok .panel")).toHaveCSS("background-color", "rgb(231, 245, 234)");
    if (shots && !shots.correctDone) {
      shots.correctDone = true;
      await shotFeedback(page, ART + "/feedback-correct.png");
    }
    await dismiss(page, false);
  }
}

async function doChoice(page, step, opts) {
  const retry = opts.screen === "level";
  if (opts.wrong) {
    const wi = wrongIndex(step);
    await page.locator('[data-option="' + wi + '"]').click();
    await expect(page.locator("#feedback")).toHaveClass(/bad/);
    await expect(page.locator("#feedback-text")).toHaveText(feedbackOf(step, wi, false));
    await expect(page.locator("#feedback.bad .panel")).toHaveCSS("background-color", "rgb(255, 241, 224)");
    if (opts.shots && !opts.shots.wrongDone) {
      opts.shots.wrongDone = true;
      await shotFeedback(page, ART + "/feedback-wrong.png");
    }
    if (!retry) {
      await dismiss(page, false);
      return;
    }
    await dismiss(page, true);
    await expect(page.locator('[data-option="' + wi + '"]')).toBeDisabled();
  }
  const ri = rightIndex(step);
  await page.locator('[data-option="' + ri + '"]').click();
  await expect(page.locator("#feedback-text")).toHaveText(feedbackOf(step, ri, true));
  await expect(page.locator("#feedback")).toHaveClass(/ok/);
  if (opts.shots && !opts.shots.correctDone) {
    opts.shots.correctDone = true;
    await shotFeedback(page, ART + "/feedback-correct.png");
  }
  await dismiss(page, false);
}

async function assertPairFlash(page, id) {
  const el = page.locator('[data-matched="' + id + '"]');
  await expect(el).toHaveClass(/flash/);
  await expect(el).toHaveCSS("animation-name", "pairflash");
  await el.evaluate(async (node) => {
    await Promise.all(node.getAnimations().map((a) => a.finished));
  });
  await expect(el).toHaveCSS("background-color", "rgb(231, 245, 234)");
}

async function doMatch(page, step, opts) {
  if (opts.wrong) {
    await dragTo(page, page.locator('[data-drag="money"]'), page.locator('[data-drop="temp"]'));
    await expect(page.locator("#hint")).toHaveText(step.wrong);
    await page.locator('[data-drag="money"]').click();
    await page.locator('[data-drop="money"]').click();
    await expect(page.locator('[data-matched="money"]')).toBeVisible();
    await assertPairFlash(page, "money");
    await dragTo(page, page.locator('[data-drag="temp"]'), page.locator('[data-drop="temp"]'));
    await expect(page.locator('[data-matched="temp"]')).toBeVisible();
    for (const pair of step.pairs.slice(2)) {
      const drops = await page.locator("[data-drop]").evaluateAll((els) => els.map((el) => el.dataset.drop));
      const other = drops.find((id) => id !== pair.id);
      if (other) {
        await page.locator('[data-drag="' + pair.id + '"]').click();
        await page.locator('[data-drop="' + other + '"]').click();
        await expect(page.locator("#hint")).toHaveText(step.wrong);
      }
      await page.locator('[data-drag="' + pair.id + '"]').click();
      await page.locator('[data-drop="' + pair.id + '"]').click();
    }
  } else {
    let flashed = false;
    for (const pair of step.pairs) {
      await page.locator('[data-drag="' + pair.id + '"]').click();
      await page.locator('[data-drop="' + pair.id + '"]').click();
      if (!flashed) {
        await assertPairFlash(page, pair.id);
        flashed = true;
      }
    }
  }
  await expect(page.locator('[data-matched="alt"] .example-tag')).toHaveCount(0);
  await expect(page.locator('[data-matched="money"] .example-tag')).toHaveText("示例数字");
  await expect(page.locator(".example-tag")).toHaveCount(5);
  await page.locator("#step-next").click();
}

async function doBucket(page, step, opts) {
  await expect(page.locator('[data-card="p5"]')).toHaveCSS("color", "rgb(31, 95, 191)");
  await expect(page.locator('[data-card="n8"]')).toHaveCSS("color", "rgb(179, 38, 30)");
  await expect(page.locator('[data-card="z0"]')).toHaveCSS("color", "rgb(68, 68, 68)");
  if (opts.wrong) {
    await dragTo(page, page.locator('[data-card="p5"]'), page.locator('[data-drop="负数"]'));
    await expect(page.locator("#hint")).toHaveText(step.cards[0].wrong);
    await page.locator('[data-card="p5"]').click();
    await page.locator('[data-drop="正数"]').click();
    await expect(page.locator('[data-card="p5"]')).toHaveCount(0);
    await dragTo(page, page.locator('[data-card="p3"]'), page.locator('[data-drop="正数"]'));
    await expect(page.locator('[data-card="p3"]')).toHaveCount(0);
    for (const card of step.cards.slice(2)) {
      const wrongBucket = card.bucket === "正数" ? "负数" : "正数";
      await page.locator('[data-card="' + card.id + '"]').click();
      await page.locator('[data-drop="' + wrongBucket + '"]').click();
      await expect(page.locator("#hint")).toHaveText(card.wrong);
      await page.locator('[data-card="' + card.id + '"]').click();
      await page.locator('[data-drop="' + card.bucket + '"]').click();
      if (card.easter) await expect(page.getByText("板樟山有 1999 级台阶哦", { exact: true })).toBeVisible();
    }
  } else {
    for (const card of step.cards) {
      await page.locator('[data-card="' + card.id + '"]').click();
      await page.locator('[data-drop="' + card.bucket + '"]').click();
      if (card.easter) await expect(page.getByText("板樟山有 1999 级台阶哦", { exact: true })).toBeVisible();
    }
  }
  await expect(page.locator("#step-next")).toBeVisible();
  await expect(page.getByText("板樟山有 1999 级台阶哦", { exact: true })).toBeVisible();
  await page.locator("#step-next").click();
}

async function doSlider(page, step, opts) {
  if (opts.wrong && opts.shots && !opts.shots.sliderDragged) {
    opts.shots.sliderDragged = true;
    const icon = page.locator("[data-slider]:not([disabled])");
    await icon.scrollIntoViewIfNeeded();
    const box = await icon.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + 16);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 110, { steps: 8 });
    await page.mouse.up();
    await expect(page.locator("#readout")).not.toHaveText("");
  }
  const retry = opts.screen === "level";
  if (opts.wrong) {
    const far = step.target >= 0 ? -40 : 80;
    await setRuler(page, far);
    await page.locator('[data-action="place-ok"]').click();
    await expect(page.locator("#feedback-text")).toHaveText(step.feedback.wrong);
    await expect(page.locator("#feedback")).toHaveClass(/bad/);
    if (opts.shots && !opts.shots.wrongDone) {
      opts.shots.wrongDone = true;
      await shotFeedback(page, ART + "/feedback-wrong.png");
    }
    await dismiss(page, retry);
    if (!retry) return;
  }
  await page.locator("[data-slider]:not([disabled])").click();
  await setRuler(page, step.target);
  await page.locator('[data-action="place-ok"]').click();
  await expect(page.locator("#feedback-text")).toHaveText(step.feedback.correct);
  if (opts.shots && !opts.shots.correctDone) {
    opts.shots.correctDone = true;
    await shotFeedback(page, ART + "/feedback-correct.png");
  }
  await dismiss(page, false);
}

async function doMulti(page, step, opts) {
  if (opts.wrong) {
    await page.locator('[data-card="c5"]').click();
    await page.locator('[data-action="submit-multi"]').click();
    await expect(page.locator("#feedback-text")).toHaveText(step.feedback.wrong);
    await dismiss(page, false);
    return;
  }
  for (const id of step.correct) await page.locator('[data-card="' + id + '"]').click();
  await page.locator('[data-action="submit-multi"]').click();
  await expect(page.locator("#feedback-text")).toHaveText(step.feedback.correct);
  await dismiss(page, false);
}

async function doOrder(page, step, opts) {
  await dragTo(page, page.locator('[data-order="1"]'), page.locator('[data-order="3"]'));
  let order = await page.locator("[data-order]").evaluateAll((els) => els.map((el) => el.dataset.order));
  expect(order.join(",")).not.toBe("1,2,3");
  if (opts.wrong && order.join(",") !== step.correct.join(",")) {
    await page.locator('[data-action="submit-order"]').click();
    await expect(page.locator("#feedback-text")).toHaveText(step.feedback.wrong);
    await dismiss(page, false);
    return;
  }
  for (let guard = 0; guard < 6; guard++) {
    order = await page.locator("[data-order]").evaluateAll((els) => els.map((el) => el.dataset.order));
    const i = order.findIndex((id, idx) => id !== step.correct[idx]);
    if (i < 0) break;
    const j = order.indexOf(step.correct[i]);
    await page.locator('[data-order="' + order[i] + '"]').click();
    await page.locator('[data-order="' + order[j] + '"]').click();
  }
  order = await page.locator("[data-order]").evaluateAll((els) => els.map((el) => el.dataset.order));
  expect(order).toEqual(step.correct);
  await page.locator('[data-action="submit-order"]').click();
  await expect(page.locator("#feedback-text")).toHaveText(step.feedback.correct);
  await dismiss(page, false);
}

async function doInput(page, step, opts) {
  const retry = opts.screen === "level";
  if (opts.wrong && step.id === "L0-b2") {
    await typeDigits(page, "46");
    await expect(page.locator("#feedback-text")).toHaveText("卡片 B 是比海平面『低』，你按的是哪个符号？");
    if (opts.shots && !opts.shots.wrongDone) {
      opts.shots.wrongDone = true;
      await shotFeedback(page, ART + "/feedback-wrong.png");
    }
    await dismiss(page, true);
    await expect(page.locator("#entry")).toHaveText("");
    await typeDigits(page, "+46");
    await expect(page.locator("#feedback-text")).toHaveText("卡片 B 是比海平面『低』，你按的是哪个符号？");
    await dismiss(page, true);
    await typeDigits(page, "−46");
    await expect(page.locator("#feedback-text")).toHaveText("找到了！");
    if (opts.shots && !opts.shots.correctDone) {
      opts.shots.correctDone = true;
      await shotFeedback(page, ART + "/feedback-correct.png");
    }
    await dismiss(page, false);
    return;
  }
  if (opts.wrong) {
    const wrong = step.answer === "0" ? "1" : "1";
    await typeDigits(page, wrong);
    await expect(page.locator("#feedback")).toHaveClass(/bad/);
    const message = await page.evaluate((id) => {
      const L = window.__ZH__.LESSON;
      let step = null;
      for (const lv of L.levels) step = lv.steps.find((s) => s.id === id) || step;
      step = L.quiz.find((q) => q.id === id) || step;
      return window.__ZH__.gradeInput(step, "1").message;
    }, step.id);
    await expect(page.locator("#feedback-text")).toHaveText(message);
    if (opts.shots && !opts.shots.wrongDone) {
      opts.shots.wrongDone = true;
      await shotFeedback(page, ART + "/feedback-wrong.png");
    }
    await dismiss(page, retry);
    if (!retry) return;
    await expect(page.locator("#entry")).toHaveText("");
  }
  await typeDigits(page, step.answer);
  await finishCorrectInput(page, step, opts.shots);
}

async function act(page, step, opts) {
  if (step.type === "animation") {
    await expect(page.locator("#step-next")).toBeVisible({ timeout: 8000 });
    await expect(page.locator("#caption")).toHaveText("到了！✓");
    await expect(page.locator("#caption2")).toHaveText("隧道在哪？这里只有树……");
    await expect(page.locator("#face")).toHaveAttribute("visibility", "visible");
    await page.locator("#step-next").click();
    return;
  }
  if (step.type === "info") {
    if (step.id === "L0-def") {
      await expect(page.locator("#main")).toContainText("像 274、46 这样大于 0 的数叫正数（也可以写成 +274，读作「正二百七十四」）。");
      await expect(page.locator("#step-next")).toHaveText("我记住了");
    }
    await page.locator("#step-next").click();
    return;
  }
  if (step.type === "single" || step.type === "judge") return doChoice(page, step, opts);
  if (step.type === "dragMatch") return doMatch(page, step, opts);
  if (step.type === "dragBucket") return doBucket(page, step, opts);
  if (step.type === "verticalSlider") return doSlider(page, step, opts);
  if (step.type === "multi") return doMulti(page, step, opts);
  if (step.type === "order") return doOrder(page, step, opts);
  if (step.type === "numpad" || step.type === "input") return doInput(page, step, opts);
  throw new Error("unknown type " + step.type);
}

async function playLevel(page, id, opts) {
  await page.locator('button[data-level="' + id + '"]').click();
  await expect(page.locator("body")).toHaveAttribute("data-level", id);
  if (opts.shot) await page.screenshot({ path: opts.shot });
  for (let guard = 0; guard < 40; guard++) {
    if ((await page.locator("body").getAttribute("data-screen")) !== "level") return;
    const step = await getStep(page);
    await assertLayout(page);
    await assertNoAsciiMinus(page);
    await assertNoShuzhou(page);
    if (step.type !== "animation") await assertExamples(page, step);
    if (step.id === "L0-a") await expect(page.locator(".sign-key")).toHaveCount(0);
    if (step.id === "L0-b2") await expect(page.locator(".sign-key.blink")).toHaveCount(2);
    if (step.narration) await expect(page.locator(".narration")).toHaveText(step.narration);
    if (step.tide) {
      await expect(page.locator(".tide")).toContainText("0：今天早上的水位");
      await expect(page.locator(".prescribe .kicker")).toHaveText("规定");
    }
    if (step.tide === "up") await expect(page.locator(".seg.on")).toHaveText("上涨记为 +");
    if (step.flip) {
      await expect(page.locator(".switch.blink")).toHaveCount(1);
      await expect(page.locator(".seg.on")).toHaveText("下降记为 +");
    }
    if (step.rule) await expect(page.locator(".rule")).toHaveText(step.rule);
    const touch = page.locator(".card, .num-card, .order-card, .icon-btn, .ruler-track").first();
    if (await touch.count()) {
      await expect(touch).toHaveCSS("touch-action", "none");
    }
    await act(page, step, opts);
  }
  throw new Error("level did not finish " + id);
}

async function playQuiz(page, opts) {
  let screen = await page.locator("body").getAttribute("data-screen");
  if (screen !== "quiz") {
    if (screen !== "quizResult") await page.locator('[data-action="start-quiz"]').click();
    screen = await page.locator("body").getAttribute("data-screen");
    if (screen === "quizResult") await page.locator('[data-action="retake-quiz"]').click();
  }
  for (let guard = 0; guard < 16; guard++) {
    if ((await page.locator("body").getAttribute("data-screen")) === "quizResult") return;
    const step = await getStep(page);
    await assertLayout(page);
    await assertNoAsciiMinus(page);
    await assertExamples(page, step);
    await expect(page.locator("#starbar")).toHaveText("");
    if (step.optional) await expect(page.locator("#eyebrow")).toHaveText("选做");
    else await expect(page.locator("#eyebrow")).toHaveText(/^\d+ \/ 10$/);
    if (step.optional && opts.skipOptional) {
      await page.locator('[data-action="skip-optional"]').click();
      continue;
    }
    await act(page, step, Object.assign({}, opts, { screen: "quiz" }));
  }
  throw new Error("quiz did not finish");
}

async function answerReviewQuestion(page, wrong) {
  const step = await getStep(page);
  await assertLayout(page);
  await assertNoAsciiMinus(page);
  await assertExamples(page, step);
  await act(page, step, { wrong: wrong, screen: "review", shots: { wrongDone: true, correctDone: true, sliderDragged: true } });
}

test("phone playthrough, quiz, review, reset", async ({ page }) => {
  test.setTimeout(600000);
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/math7a-1-1/");
  await expect(page.getByText("珠海高度地图", { exact: true })).toBeVisible();
  await expect(page.locator("#sound-btn")).toHaveText("音效：关");
  await assertLayout(page);
  await expect(page.getByText("应试题型提示")).toHaveCount(0);
  await page.locator("summary", { hasText: "给家长" }).click();
  await expect(page.locator("#main")).toContainText("见 §7");
  await page.screenshot({ path: ART + "/lesson-home-phone.png" });
  await expect(page.locator('[data-level="L1"]')).toBeDisabled();

  await page.locator('[data-level="L0"]').click();
  await typeDigits(page, "274");
  await expect(page.locator("body")).toHaveAttribute("data-step", "L0-b");
  await expect(page.locator("#starbar")).toHaveText("★····");
  await page.locator("#nav-btn").click();
  await expect(page.locator('[data-level="L0"] .stars')).toHaveText("★····");
  await page.screenshot({ path: ART + "/star-full.png" });
  await page.reload();
  await page.locator('[data-level="L0"]').click();
  await expect(page.locator("body")).toHaveAttribute("data-step", "L0-b");
  await page.locator("#nav-btn").click();

  await page.locator('[data-action="reset-ask"]').click();
  await expect(page.locator("#modal-title")).toHaveText("重置进度");
  await page.locator("#modal-cancel").click();
  await expect(page.locator('[data-level="L0"] .stars')).toHaveText("★····");
  await page.locator('[data-action="reset-ask"]').click();
  await page.locator("#modal-ok").click();
  await expect(page.locator("#modal-title")).toHaveText("再确认一次");
  await expect(page.locator("#modal-body")).toHaveText("重置后不能恢复。");
  await page.locator("#modal-ok").click();
  await expect(page.locator("#modal")).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem("zh-math7a-1-1"))).toBeNull();
  await expect(page.locator('[data-level="L1"]')).toBeDisabled();
  await expect(page.locator('[data-level="L0"] .stars')).toHaveText("·····");

  await page.locator("#sound-btn").click();
  await page.reload();
  await expect(page.locator("#sound-btn")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#sound-btn")).toHaveText("音效：开");

  const shots = { wrongDone: false, correctDone: false, sliderDragged: false };
  const levelShots = {
    L0: ART + "/level0-phone.png",
    L1: ART + "/level1-phone.png",
    L2: ART + "/level2-phone.png",
    L3: ART + "/level3-phone.png",
    L4: ART + "/level4-phone.png",
    L5: ART + "/level5-phone.png"
  };
  for (const id of ["L0", "L1", "L2", "L3", "L4"]) {
    await playLevel(page, id, { wrong: true, screen: "level", shots, shot: levelShots[id] });
    if (id === "L0") {
      await expect(page.locator('[data-level="L0"] .stars')).toHaveText("☆☆☆☆☆");
      const plays = await page.evaluate(() => window.__ZH__.soundPlays());
      expect(plays).toBeGreaterThan(0);
      await page.screenshot({ path: ART + "/star-hollow.png" });
      await page.locator("#sound-btn").click();
      await expect(page.locator("#sound-btn")).toHaveAttribute("aria-pressed", "false");
      await expect(page.locator("#sound-btn")).toHaveText("音效：关");
    }
  }
  await expect(page.locator('[data-level="L5"]')).toBeEnabled();
  await expect(page.locator('[data-action="start-quiz"]')).toBeEnabled();
  await playLevel(page, "L5", { wrong: true, screen: "level", shots, shot: levelShots.L5 });

  await playQuiz(page, { wrong: false, screen: "quiz", shots });
  await expect(page.locator(".score")).toHaveText("10 / 10");
  await expect(page.locator("#main")).toContainText("记录员认证通过！你已经能给小珠写清楚任何高度了。");
  await expect(page.getByRole("heading", { name: "需要回看的关卡" })).toHaveCount(0);
  await assertLayout(page);
  await page.screenshot({ path: ART + "/quiz-result.png" });
  await page.getByRole("button", { name: "回到地图", exact: true }).click();
  await expect(page.getByText("应试题型提示（可选）")).toBeVisible();
  await assertLayout(page);
  await page.locator("#nav-btn").click();
  await expect(page.locator("#status")).toHaveText("小测 10 / 10");
  await page.goto("/math7a-1-1/");

  await playQuiz(page, { wrong: true, screen: "quiz", shots });
  await expect(page.locator(".score")).toHaveText("0 / 10");
  await expect(page.locator("#main")).toContainText("没关系，先回第 0 关看小珠为什么飞错，再慢慢来。");
  await expect(page.getByRole("heading", { name: "需要回看的关卡" })).toBeVisible();
  await assertLayout(page);
  for (const id of ["L0", "L1", "L2", "L3", "L4", "L5"]) {
    await expect(page.locator('[data-action="replay-level"][data-level="' + id + '"]')).toBeVisible();
  }
  await page.screenshot({ path: ART + "/quiz-result-low.png" });

  await page.evaluate(() => {
    const p = JSON.parse(localStorage.getItem("zh-math7a-1-1"));
    const answers = {};
    window.__ZH__.LESSON.quiz.forEach((q) => {
      if (!q.optional) answers[q.id] = { ok: true, skipped: false };
    });
    p.quiz.answers = answers;
    p.quiz.inProgress = true;
    p.quiz.status = "done";
    p.quiz.score = null;
    localStorage.setItem("zh-math7a-1-1", JSON.stringify(p));
  });
  await page.reload();
  await page.locator('[data-action="start-quiz"]').click();
  await expect(page.locator("body")).toHaveAttribute("data-step", "Q11");
  await expect(page.locator('[data-action="skip-optional"]')).toHaveAttribute("aria-label", "跳过选做题");
  await page.locator('[data-action="skip-optional"]').click();
  await expect(page.locator(".score")).toHaveText("10 / 10");
  await expect(page.getByRole("heading", { name: "需要回看的关卡" })).toHaveCount(0);

  await page.evaluate(() => {
    const p = JSON.parse(localStorage.getItem("zh-math7a-1-1"));
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const z = (n) => String(n).padStart(2, "0");
    p.nextReview = d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
    p.reviewStage = 0;
    p.quiz.inProgress = false;
    p.quiz.score = 10;
    localStorage.setItem("zh-math7a-1-1", JSON.stringify(p));
  });
  await page.reload();
  await expect(page.locator(".due-dot")).toBeVisible();
  await expect(page.locator('[data-action="start-review"]')).toHaveAttribute("aria-label", /已到期/);
  await page.locator('[data-action="start-review"]').click();
  await expect(page.locator("#eyebrow")).toHaveText("1 / 3");
  await answerReviewQuestion(page, true);
  await expect(page.locator("#eyebrow")).toHaveText("2 / 3");
  await answerReviewQuestion(page, false);
  await answerReviewQuestion(page, false);
  await expect(page.locator(".score")).toHaveText("3 题答对 2 题");
  expect(await page.locator('[data-action="replay-level"]').count()).toBeGreaterThan(0);
  await assertLayout(page);
  await page.screenshot({ path: ART + "/review-result.png" });
  const starsBefore = await page.evaluate(() => localStorage.getItem("zh-math7a-1-1"));
  await page.getByRole("button", { name: "回到地图", exact: true }).click();
  await expect(page.locator(".due-dot")).toBeHidden();
  const stored = JSON.parse(await page.evaluate(() => localStorage.getItem("zh-math7a-1-1")));
  expect(stored.reviewStage).toBe(1);
  expect(stored.levels.L0.stars["L0-a"]).toBe("hollow");
  expect(JSON.parse(starsBefore).levels.L0.stars["L0-a"]).toBe("hollow");
  expect(errors).toEqual([]);
});

async function playCorrectLesson(page, shot) {
  await page.goto("/math7a-1-1/");
  await page.evaluate(() => localStorage.removeItem("zh-math7a-1-1"));
  await page.reload();
  const shots = { wrongDone: true, correctDone: true, sliderDragged: true };
  for (const id of ["L0", "L1", "L2", "L3", "L4", "L5"]) {
    await playLevel(page, id, { wrong: false, screen: "level", shots, shot: id === "L4" ? shot : "" });
  }
  await playQuiz(page, { wrong: false, screen: "quiz", shots });
  await expect(page.locator(".score")).toHaveText("10 / 10");
}

test("iPad portrait playthrough", async ({ page }) => {
  test.setTimeout(600000);
  await page.setViewportSize({ width: 820, height: 1180 });
  await playCorrectLesson(page, ART + "/ipad-portrait.png");
});

test("iPad landscape playthrough", async ({ page }) => {
  test.setTimeout(600000);
  await page.setViewportSize({ width: 1180, height: 820 });
  await playCorrectLesson(page, ART + "/ipad-landscape.png");
});

test("phone landscape layout", async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/math7a-1-1/");
  await page.evaluate(() => {
    const levels = {};
    window.__ZH__.LESSON.levels.forEach((lv) => { levels[lv.id] = { status: "open", stars: {} }; });
    localStorage.setItem("zh-math7a-1-1", JSON.stringify({
      version: 1, sound: false, levels,
      quiz: { status: "open", cursor: 0, answers: {}, inProgress: false, score: null, scheduled: false },
      nextReview: null, reviewStage: 0, lastCompleteDate: null, checkpoint: null, pending: {}
    }));
  });
  await page.reload();
  await assertLayout(page);
  for (const id of ["L0", "L1", "L2", "L3", "L4", "L5"]) {
    await page.locator('button[data-level="' + id + '"]').click();
    await assertLayout(page);
    await assertNoAsciiMinus(page);
    await assertNoShuzhou(page);
    const step = await getStep(page);
    if (step.type !== "animation") await assertExamples(page, step);
    await page.locator("#nav-btn").click();
  }
  await page.locator('[data-action="start-quiz"]').click();
  await assertLayout(page);
  await assertExamples(page, await getStep(page));
  await page.screenshot({ path: ART + "/phone-landscape.png" });
});

test("offline reload keeps the lesson and saved progress", async ({ page, context }) => {
  await page.goto("/");
  const swReady = await page.evaluate(() => Promise.race([
    navigator.serviceWorker.ready.then(() => "ready"),
    new Promise((resolve) => setTimeout(() => resolve("timeout"), 8000))
  ]));
  expect(swReady).toBe("ready");
  if (!(await page.evaluate(() => !!navigator.serviceWorker.controller))) await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 15000 }).toBe(true);
  await page.goto("/math7a-1-1/");
  await page.evaluate(() => {
    const levels = {};
    window.__ZH__.LESSON.levels.forEach((lv) => { levels[lv.id] = { status: lv.id === "L0" ? "done" : "open", stars: {} }; });
    localStorage.setItem("zh-math7a-1-1", JSON.stringify({
      version: 1, sound: false, levels,
      quiz: { status: "locked", cursor: 0, answers: {}, inProgress: false, score: null, scheduled: false },
      nextReview: null, reviewStage: 0, lastCompleteDate: "2026-10-22", checkpoint: null, pending: {}
    }));
  });
  await page.reload();
  await expect(page.locator('[data-level="L1"]')).toBeEnabled();
  await expect.poll(async () => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("h1")).toHaveText("珠海海拔记录员");
  await expect(page.locator('[data-level="L1"]')).toBeEnabled();
  await expect(page.locator("#main")).toContainText("珠海高度地图");
  const raw = await page.evaluate(() => localStorage.getItem("zh-math7a-1-1"));
  expect(JSON.parse(raw).levels.L0.status).toBe("done");
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("趣学");
  await expect(page.locator("#status")).toHaveText("继续学习");
});
