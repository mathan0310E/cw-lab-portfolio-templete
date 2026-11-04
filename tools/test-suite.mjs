/*
 * CWLABS Portfolio Builder — test suite.
 *
 * Runs the whole builder pipeline (utils -> adapter -> registry -> renderer ->
 * templates) in a Node VM sandbox, then exercises every template against the
 * ten validation scenarios from the brief.
 *
 * Usage: node tools/test-suite.mjs
 */
import fs from "fs";
import vm from "vm";
import path from "path";

const ROOT = path.resolve(".");

/* ---------- sandbox ---------- */
const sandbox = {
  window: {}, console,
  Date, JSON, Math, Number, String, Array, Object, parseInt, parseFloat,
  isNaN, RegExp, Error, Promise, setTimeout, clearTimeout, encodeURIComponent,
  decodeURIComponent
};
sandbox.window.window = sandbox.window;
sandbox.globalThis = sandbox;
// Minimal document/localStorage stubs so app-level modules can be syntax-checked.
sandbox.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ setAttribute() {}, appendChild() {}, style: {}, classList: { add() {}, remove() {}, toggle() {} } }),
  head: { appendChild() {} },
  addEventListener() {},
  documentElement: { classList: { add() {} } }
};
sandbox.window.localStorage = {
  _d: {},
  getItem(k) { return this._d[k] ?? null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; }
};
sandbox.window.matchMedia = () => ({ matches: false });
const ctx = vm.createContext(sandbox);

const CORE = [
  "assets/js/utils.js",
  "assets/js/anim.js",
  "assets/js/adapter.js",
  "assets/js/registry.js",
  "assets/js/store.js",
  "assets/js/sample-data.js",
  "assets/js/renderer.js"
];

function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), ctx, { filename: rel });
}
CORE.forEach(load);

const templateFiles = fs.readdirSync(path.join(ROOT, "assets/js"))
  .filter((f) => /^template-\d+-.*\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/template-(\d+)/)[1], 10) - parseInt(b.match(/template-(\d+)/)[1], 10));
templateFiles.forEach((f) => load("assets/js/" + f));

const CW = sandbox.window.CW;

/* ---------- assertions ---------- */
let pass = 0, fail = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { pass++; }
  else { fail++; failures.push(name + (detail ? " :: " + detail : "")); }
}

/* ---------- scenarios ---------- */
const base = JSON.parse(JSON.stringify(sandbox.window.CW_SAMPLE_DATA));

const scenarios = {
  "complete": base,
  "missing-profile-photo": (() => { const d = JSON.parse(JSON.stringify(base)); d.basics.profileImage = ""; return d; })(),
  "missing-cover-image": (() => { const d = JSON.parse(JSON.stringify(base)); d.basics.coverImage = ""; return d; })(),
  "no-projects": (() => { const d = JSON.parse(JSON.stringify(base)); d.projects = []; return d; })(),
  "no-experience": (() => { const d = JSON.parse(JSON.stringify(base)); d.experience = []; return d; })(),
  "no-certificates": (() => { const d = JSON.parse(JSON.stringify(base)); d.certificates = []; return d; })(),
  "long-biography": (() => { const d = JSON.parse(JSON.stringify(base)); d.basics.bio = Array(40).fill("A long paragraph describing work, research and interests in depth.").join("\n\n"); return d; })(),
  "multiple-skills": (() => {
    const d = JSON.parse(JSON.stringify(base));
    d.skills = [];
    for (let i = 0; i < 40; i++) d.skills.push({ name: "Skill " + i, category: "Group " + (i % 5), level: (i * 7) % 101 });
    return d;
  })(),
  "multiple-social-links": (() => {
    const d = JSON.parse(JSON.stringify(base));
    d.links.other = [];
    for (let i = 0; i < 12; i++) d.links.other.push({ label: "Network " + i, url: "https://example.com/n" + i });
    return d;
  })(),
  "empty-record": {}
};

const ALL = CW.registry.all.map((t) => t.id);

/* ---------- 1. registry integrity ---------- */
check("registry has 26 templates", ALL.length === 26, "got " + ALL.length);
["template-1","template-2","template-3","template-4","template-5","template-6","template-7",
 "template-18","template-19","template-20","template-21","template-22","template-23",
 "template-24","template-25","template-26","template-27","template-28","template-29",
 "template-30","template-31","template-32","template-33","template-34",
 "template-35","template-36"].forEach((id) => {
  check("registry entry " + id, CW.registry.exists(id));
  const meta = CW.registry.get(id);
  check(id + " has css", !!meta.css);
  check(id + " has js", !!meta.js);
  check(id + " has thumbnail file", fs.existsSync(path.join(ROOT, meta.thumb)), meta.thumb);
  check(id + " has stylesheet file", fs.existsSync(path.join(ROOT, meta.css)), meta.css);
  check(id + " has script file", fs.existsSync(path.join(ROOT, meta.js)), meta.js);
  check(id + " renderer registered", typeof (CW.templates[id] || {}).render === "function");
  check(id + " has name + description", !!meta.name && !!meta.description);
});

/* ---------- 2. every template renders in every scenario ---------- */
for (const id of ALL) {
  for (const [sname, raw] of Object.entries(scenarios)) {
    const data = CW.adapter.normalize(raw, id);
    let html = "";
    try {
      html = CW.templates[id].render(data);
    } catch (e) {
      check(`${id} renders [${sname}]`, false, e.message);
      continue;
    }
    check(`${id} renders [${sname}]`, typeof html === "string" && html.length > 40, "len=" + (html && html.length));
    // No unresolved template markers or undefined leaks.
    check(`${id} no "undefined" [${sname}]`, !/undefined/.test(html), "found 'undefined'");
    check(`${id} no NaN [${sname}]`, !/>NaN</.test(html));
  }
}

/* ---------- 3. renderer builds a valid document ---------- */
for (const id of ALL) {
  const data = CW.adapter.normalize(base, id);
  let doc = "";
  try { doc = CW.renderer.buildDocument({ data, templateId: id }); }
  catch (e) { check(id + " buildDocument", false, e.message); continue; }
  check(id + " doc is html", doc.indexOf("<!DOCTYPE html>") === 0);
  check(id + " doc has template css", doc.indexOf(CW.registry.get(id).css) > -1);
  check(id + " doc has template js", doc.indexOf(CW.registry.get(id).js) > -1);
  check(id + " doc has meta description", /<meta name="description"/.test(doc));
  check(id + " doc has JSON-LD", /application\/ld\+json|"@type":\s*"Person"/.test(doc));
  check(id + " doc embeds data", doc.indexOf("CW_PORTFOLIO_DATA") > -1);
  check(id + " doc closes html", doc.trim().endsWith("</html>"));
}

/* ---------- 4. accurate data display ---------- */
const richData = CW.adapter.normalize(base, "template-18");
const nameEsc = "Aarav Menon";
ALL.forEach((id) => {
  const html = CW.templates[id].render(richData);
  check(id + " shows full name", html.indexOf(nameEsc) > -1);
});
// Project + skill + cert presence where the template is expected to show them.
["template-18","template-20","template-21","template-23","template-24","template-25","template-27","template-28","template-29","template-30","template-31","template-32","template-33","template-34","template-35","template-36"].forEach((id) => {
  const html = CW.templates[id].render(richData);
  check(id + " shows a project name", html.indexOf("Sentinel Log Pipeline") > -1);
});
["template-19","template-22","template-24","template-25","template-27","template-28","template-30","template-31","template-32","template-33","template-34","template-35","template-36"].forEach((id) => {
  const html = CW.templates[id].render(richData);
  check(id + " shows a certificate", html.indexOf("Certified Ethical Hacker") > -1);
});

/* ---------- 5. XSS safety ---------- */
const xss = CW.adapter.normalize({
  basics: { fullName: '<script>alert(1)</script>', bio: '<img src=x onerror=alert(1)>', email: 'a@b.co', role: '"><b>x</b>' },
  links: { website: 'javascript:alert(1)', github: 'https://github.com/ok' },
  projects: [{ name: '<svg onload=alert(1)>', description: '"><script>x</script>', technologies: ['<b>t</b>'], url: 'javascript:alert(2)', repo: 'https://github.com/x' }],
  skills: [{ name: '<i>s</i>', category: '<u>c</u>', level: 50 }]
}, "template-18");
ALL.forEach((id) => {
  const html = CW.templates[id].render(xss);
  // A live (unescaped) tag would appear as a raw "<script" opener; escaped
  // output renders as "&lt;script" and is safe.
  // Escaped user input renders as "&lt;script"; a live tag would be raw.
  check(id + " no live <script> from user input", html.indexOf("<script>alert(1)") === -1);
  check(id + " no live <svg onload>", html.indexOf("<svg onload=alert(1)>") === -1);
  check(id + " no live <img onerror>", html.indexOf("<img src=x onerror=alert(1)>") === -1);
  check(id + " strips javascript: url", html.indexOf('href="javascript:') === -1);
  check(id + " user markup is escaped", html.indexOf("&lt;script&gt;alert(1)") > -1 || html.indexOf("&lt;img") > -1);
});

/* ---------- 6. adapter normalises alternate schema field names ---------- */
const alt = CW.adapter.normalize({
  profile: { name: "Alt Name", title: "Alt Role", about: "Alt bio", basedIn: "Alt City", contactEmail: "alt@x.co", avatar: "https://x/a.png" },
  social: { gh: "https://github.com/alt", linkedinUrl: "https://linkedin.com/in/alt" },
  technicalSkills: [{ skill: "Rust", group: "Lang", proficiency: 80 }],
  work: [{ title: "Alt Project", summary: "s", stack: "Go, Rust", link: "https://x/p", github: "https://github.com/x/p" }],
  jobs: [{ position: "Engineer", organisation: "AltCo", from: "2020-01", to: "2021-01", details: "d" }],
  certifications: [{ title: "Alt Cert", authority: "AltIssuer", issued: "2021-02", url: "https://x/c" }],
  meta: { template: "template-20" }
}, "template-18");
check("adapter alt fullName", alt.basics.fullName === "Alt Name", alt.basics.fullName);
check("adapter alt role", alt.basics.role === "Alt Role");
check("adapter alt bio", alt.basics.bio === "Alt bio");
check("adapter alt location", alt.basics.location === "Alt City");
check("adapter alt profileImage", alt.basics.profileImage === "https://x/a.png");
check("adapter alt github", alt.links.github === "https://github.com/alt");
check("adapter alt linkedin", alt.links.linkedin === "https://linkedin.com/in/alt");
check("adapter alt skill name", alt.skills[0].name === "Rust");
check("adapter alt skill level", alt.skills[0].level === 80);
check("adapter alt project tech split", alt.projects[0].technologies.length === 2);
check("adapter alt experience company", alt.experience[0].company === "AltCo");
check("adapter alt cert issuer", alt.certificates[0].issuer === "AltIssuer");
check("adapter alt template id", alt.meta.templateId === "template-20");

/* ---------- 7. empty-record guarantees ---------- */
const empty = CW.adapter.normalize({}, "template-18");
check("empty basics present", typeof empty.basics === "object");
check("empty arrays present", Array.isArray(empty.projects) && Array.isArray(empty.skills));
check("empty has flags false", empty.has.projects === false && empty.has.experience === false);

/* ---------- 8. CSS isolation (no global/broad selectors) ---------- */
const cssFiles = fs.readdirSync(path.join(ROOT, "assets/css")).filter((f) => f.startsWith("template-"));
const prefixById = {
  "template-1": "cw-studio-", "template-2": "cw-vcard-", "template-3": "cw-devcv-",
  "template-4": "cw-agency-", "template-5": "cw-cyber-", "template-6": "cw-sidebar-",
  "template-7": "cw-minimal-", "template-18": "cw-monochrome-", "template-19": "cw-paper-",
  "template-20": "cw-swiss-", "template-21": "cw-brutalist-", "template-22": "cw-zen-",
  "template-23": "cw-operator-", "template-24": "cw-archive-", "template-25": "cw-datajournal-",
  "template-26": "cw-retro-", "template-27": "cw-signature-", "template-28": "cw-prism-",
  "template-29": "cw-sketch-", "template-30": "cw-nebula-", "template-31": "cw-blueprint-",
  "template-32": "cw-origami-", "template-33": "cw-sentinel-", "template-34": "cw-cipher-",
  "template-35": "cw-gridlock-", "template-36": "cw-vault-"
};
for (const f of cssFiles) {
  const id = "template-" + f.match(/template-(\d+)/)[1];
  const css = fs.readFileSync(path.join(ROOT, "assets/css", f), "utf8");
  const prefix = prefixById[id];
  // Every rule selector must reference the template prefix (or be a reduced-motion helper).
  const selectors = css.replace(/\/\*[\s\S]*?\*\//g, "").match(/[^{}]+\{/g) || [];
  let bad = [];
  for (let sel of selectors) {
    sel = sel.replace(/\{$/, "").trim();
    sel.split(",").forEach((one) => {
      one = one.trim();
      if (!one) return;
      if (one.indexOf(prefix) > -1) return;
      if (/^\.cw-reduced-motion\b/.test(one)) return;
      if (/^@/.test(one)) return;
      if (/^\d+%$/.test(one)) return;
      if (/^(from|to)$/.test(one)) return;
      bad.push(one);
    });
  }
  check(id + " css fully namespaced", bad.length === 0, bad.slice(0, 3).join(" | "));
  check(id + " css has no bare element selectors", !/(^|\})\s*(body|html|a|p|img|h1|h2|ul|li)\s*\{/.test(css));
}

/* ---------- 9. reduced-motion + responsive coverage ---------- */
for (const f of cssFiles) {
  const id = "template-" + f.match(/template-(\d+)/)[1];
  const css = fs.readFileSync(path.join(ROOT, "assets/css", f), "utf8");
  check(id + " respects prefers-reduced-motion", css.indexOf("cw-reduced-motion") > -1);
  check(id + " has mobile breakpoint", /max-width:\s*(767|600|900|1023)px/.test(css));
}

/* ---------- 10. no fixed widths that force horizontal overflow ---------- */
for (const f of cssFiles) {
  const id = "template-" + f.match(/template-(\d+)/)[1];
  const css = fs.readFileSync(path.join(ROOT, "assets/css", f), "utf8");
  check(id + " no hard px width on body/page", !/\.cw-[a-z]+-page\s*\{[^}]*width:\s*\d{3,}px/.test(css));
}

/* ---------- 11. store: publish / unpublish / public URL ---------- */
const store = CW.store;
store.saveDraft(base);
const slug = store.publish(JSON.parse(JSON.stringify(base)));
check("store publish returns slug", slug === "aarav-menon", slug);
check("store published retrievable", !!store.getPublishedBySlug(slug));
check("store publishedSlug set", store.publishedSlug() === slug);
store.unpublish(slug);
check("store unpublish removes record", store.getPublishedBySlug(slug) === null);

/* ---------- report ---------- */
console.log("\nCWLABS test suite");
console.log("  templates :", ALL.length);
console.log("  scenarios :", Object.keys(scenarios).length);
console.log("  checks    :", pass + fail);
console.log("  passed    :", pass);
console.log("  failed    :", fail);
if (fail) {
  console.log("\nFailures:");
  failures.slice(0, 60).forEach((f) => console.log("  - " + f));
  if (failures.length > 60) console.log("  ... and " + (failures.length - 60) + " more");
}
process.exit(fail === 0 ? 0 : 1);
