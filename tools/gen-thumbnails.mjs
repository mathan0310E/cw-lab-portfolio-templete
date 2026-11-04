/*
 * CWLABS — thumbnail generator.
 * Produces one 320x200 SVG preview per template so the selector shows a
 * distinct miniature of each design language. Run: node tools/gen-thumbnails.mjs
 */
import fs from "fs";
import path from "path";

const out = path.resolve("assets/thumbnails");
fs.mkdirSync(out, { recursive: true });

const W = 320, H = 200;

const wrap = (bg, body) =>
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${body}
</svg>`;

const bar = (x, y, w, h, fill, o = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${o}/>`;
const txt = (x, y, s, size, fill, extra = "") => {
  // A caller-supplied font-family replaces the default rather than duplicating it.
  const family = /font-family=/.test(extra) ? "" : ' font-family="Helvetica,Arial,sans-serif"';
  const rest = extra.replace(/\s*font-family="[^"]*"/, "");
  return `<text x="${x}" y="${y}"${family} font-size="${size}" fill="${fill}"${rest}>${s}</text>`;
};

const t = {};

/* Classic templates */
t["template-1"] = wrap("#ffffff",
  bar(0, 0, W, 26, "#f4f4fb") + txt(14, 18, "Studio", 11, "#111827", ' font-weight="700"') +
  bar(0, 26, W, 74, "#e6e6f5") + txt(14, 62, "Name", 22, "#111827", ' font-weight="800"') +
  bar(150, 44, 60, 70, "#4f46e5") +
  bar(14, 116, 90, 60, "#f4f4fb") + bar(120, 116, 90, 60, "#f4f4fb") + bar(226, 116, 80, 60, "#f4f4fb"));

t["template-2"] = wrap("#eef6fb",
  bar(30, 20, 260, 160, "#ffffff") + bar(30, 20, 92, 160, "#0f172a") +
  `<circle cx="76" cy="60" r="24" fill="#334155"/>` + bar(52, 96, 50, 6, "#7dd3fc") +
  bar(140, 40, 120, 12, "#0f172a") + bar(140, 60, 90, 8, "#94a3b8") +
  bar(140, 84, 120, 8, "#cbd5e1") + bar(140, 100, 110, 8, "#cbd5e1") + bar(140, 116, 120, 8, "#cbd5e1"));

t["template-3"] = wrap("#f1f5f9",
  bar(28, 16, 264, 168, "#ffffff") + bar(28, 16, 96, 168, "#0b1220") +
  bar(44, 40, 60, 8, "#22c55e") + bar(44, 58, 66, 6, "#475569") + bar(44, 72, 66, 6, "#475569") +
  bar(140, 36, 120, 10, "#0b1220") + bar(140, 54, 130, 6, "#94a3b8") + bar(140, 66, 110, 6, "#94a3b8") +
  bar(140, 86, 100, 8, "#0b1220") + bar(140, 102, 130, 6, "#94a3b8") + bar(140, 114, 120, 6, "#94a3b8"));

t["template-4"] = wrap("#fbfaf8",
  txt(20, 34, "Big idea", 22, "#141414", ' font-weight="800"') +
  bar(20, 50, 280, 2, "#e6e3dd") +
  bar(20, 64, 130, 56, "#efece6") + bar(160, 64, 140, 56, "#efece6") +
  bar(20, 132, 90, 44, "#efece6") + bar(118, 132, 90, 44, "#efece6") + bar(216, 132, 84, 44, "#efece6") +
  bar(20, 64, 130, 4, "#f97316"));

t["template-5"] = wrap("#0a0e14",
  bar(0, 0, W, 22, "#111823") + txt(12, 15, ">_", 10, "#06b6d4") +
  txt(18, 54, "Name", 20, "#ffffff", ' font-weight="700"') + bar(18, 64, 120, 6, "#64748b") +
  bar(190, 40, 112, 60, "#111823", ' stroke="#1e2a38"') +
  bar(200, 52, 92, 5, "#06b6d4") + bar(200, 64, 70, 5, "#334155") + bar(200, 76, 84, 5, "#334155") +
  bar(18, 116, 284, 40, "#111823") + bar(30, 128, 60, 6, "#06b6d4"));

t["template-6"] = wrap("#ffffff",
  bar(0, 0, 96, H, "#0f172a") + `<circle cx="34" cy="34" r="16" fill="#1e293b"/>` +
  bar(20, 60, 56, 7, "#e2e8f0") + bar(20, 74, 40, 6, "#64748b") +
  bar(20, 96, 60, 5, "#6366f1") + bar(20, 108, 52, 5, "#475569") + bar(20, 120, 58, 5, "#475569") +
  bar(116, 30, 170, 12, "#0f172a") + bar(116, 52, 180, 7, "#94a3b8") + bar(116, 64, 160, 7, "#cbd5e1") +
  bar(116, 90, 120, 40, "#f3f4f6") + bar(246, 90, 60, 40, "#f3f4f6"));

t["template-7"] = wrap("#ffffff",
  txt(70, 66, "Name", 24, "#1f2937", ' font-weight="700"') + bar(70, 78, 150, 6, "#9ca3af") +
  bar(70, 100, 180, 2, "#e8e8e8") + bar(70, 116, 180, 5, "#cbd5e1") + bar(70, 128, 150, 5, "#cbd5e1") +
  bar(70, 146, 180, 2, "#e8e8e8") + bar(70, 160, 120, 5, "#cbd5e1"));

/* New premium templates */
t["template-18"] = wrap("#ffffff",
  txt(16, 34, "Name", 26, "#0b0b0b", ' font-weight="700"') + bar(16, 44, 288, 2, "#111") +
  bar(16, 64, 40, 40, "#f2f2f2") +
  bar(72, 60, 200, 10, "#d5d5d5") + bar(72, 78, 220, 5, "#c9c9c9") + bar(72, 90, 180, 5, "#c9c9c9") +
  bar(16, 120, 288, 1, "#dcdcdc") + bar(16, 134, 60, 8, "#111") + bar(90, 134, 200, 6, "#d5d5d5") +
  bar(16, 156, 288, 1, "#dcdcdc") + bar(16, 170, 40, 8, "#111"));

t["template-19"] = wrap("#f7f3ea",
  txt(16, 36, "Name", 26, "#1f3d2b", ' font-family="Georgia,serif" font-style="italic"') +
  bar(16, 48, 288, 1, "#d8cfbc") +
  bar(16, 66, 110, 60, "#efe8da") + bar(140, 66, 164, 26, "#efe8da") + bar(140, 100, 164, 26, "#efe8da") +
  txt(16, 148, "Selected work", 11, "#1f3d2b") + bar(16, 158, 200, 5, "#d8cfbc"));

t["template-20"] = wrap("#ffffff",
  bar(16, 16, 14, 14, "#e30613") + txt(40, 28, "NAME", 18, "#0a0a0a", ' font-weight="700"') +
  bar(16, 44, 288, 2, "#111") +
  bar(16, 60, 40, 8, "#e30613") + bar(64, 58, 160, 12, "#0a0a0a") + bar(232, 60, 70, 6, "#6f6f6f") +
  bar(16, 84, 288, 1, "#111") + bar(16, 96, 40, 8, "#e30613") + bar(64, 94, 180, 12, "#0a0a0a") +
  bar(16, 120, 288, 1, "#111") + bar(16, 132, 40, 8, "#e30613") + bar(64, 130, 140, 12, "#0a0a0a") +
  bar(16, 156, 288, 1, "#111"));

t["template-21"] = wrap("#f3f1ea",
  bar(16, 16, 180, 64, "#ffffff", ' stroke="#0a0a0a" stroke-width="3"') +
  txt(26, 44, "NAME", 16, "#0a0a0a", ' font-weight="900"') + bar(26, 54, 120, 6, "#1b35d8") +
  bar(206, 16, 98, 64, "#1b35d8", ' stroke="#0a0a0a" stroke-width="3"') +
  bar(16, 92, 288, 40, "#ffffff", ' stroke="#0a0a0a" stroke-width="3"') + bar(16, 92, 40, 40, "#0a0a0a") +
  bar(16, 144, 288, 40, "#ffffff", ' stroke="#0a0a0a" stroke-width="3"') + bar(16, 144, 40, 40, "#0a0a0a"));

t["template-22"] = wrap("#f2ede4",
  bar(16, 20, 90, 100, "#e7dfd2") + txt(140, 50, "Name", 22, "#2b2b28", ' font-family="Georgia,serif"') +
  bar(140, 62, 140, 5, "#6b7355") + bar(140, 74, 120, 5, "#8a8578") +
  txt(24, 160, "About", 10, "#6b7355", ' transform="rotate(-90 24 160)"') +
  bar(60, 148, 240, 1, "#d6ccbb") + bar(60, 166, 160, 5, "#c9c0af"));

t["template-23"] = wrap("#14171a",
  txt(16, 34, "root@cw:~$", 11, "#3ddc84") + txt(16, 58, "Name", 20, "#ffffff", ' font-weight="700"') +
  bar(16, 70, 140, 5, "#8b979f") +
  bar(16, 88, 288, 34, "#1b2025", ' stroke="#2c343b"') + bar(28, 96, 60, 8, "#e05548") + bar(96, 98, 120, 5, "#3ddc84") +
  bar(16, 130, 288, 34, "#1b2025", ' stroke="#2c343b"') + bar(28, 138, 60, 8, "#3ddc84") + bar(96, 140, 120, 5, "#8b979f") +
  bar(16, 172, 140, 5, "#3ddc84"));

t["template-24"] = wrap("#ffffff",
  txt(16, 30, "NAME", 16, "#1b2a41", ' font-weight="700"') + bar(16, 40, 288, 1, "#dfe3e8") +
  bar(16, 56, 90, 4, "#6b7684") + `<circle cx="120" cy="58" r="5" fill="none" stroke="#1b2a41" stroke-width="2"/>` + bar(136, 54, 150, 8, "#1b2a41") +
  bar(120, 63, 1, 30, "#dfe3e8") +
  bar(16, 96, 90, 4, "#6b7684") + `<circle cx="120" cy="98" r="5" fill="none" stroke="#1b2a41" stroke-width="2"/>` + bar(136, 94, 130, 8, "#1b2a41") +
  bar(120, 103, 1, 30, "#dfe3e8") +
  bar(16, 136, 90, 4, "#6b7684") + `<circle cx="120" cy="138" r="5" fill="none" stroke="#1b2a41" stroke-width="2"/>` + bar(136, 134, 140, 8, "#1b2a41"));

t["template-25"] = wrap("#ffffff",
  txt(16, 32, "Name", 20, "#12233d", ' font-weight="800"') + bar(16, 44, 140, 5, "#0f766e") +
  bar(16, 66, 288, 60, "#ffffff", ' stroke="#dde4ec"') + bar(16, 66, 4, 60, "#0f766e") +
  bar(30, 78, 120, 8, "#12233d") + bar(30, 94, 250, 5, "#94a3b8") +
  bar(30, 106, 120, 14, "#f4f7fa") + bar(160, 106, 120, 14, "#f4f7fa") +
  bar(16, 140, 8, 30, "#0f766e") + bar(30, 148, 8, 22, "#14958a") + bar(44, 136, 8, 34, "#0f766e") + bar(58, 156, 8, 14, "#14958a"));

t["template-26"] = wrap("#e8e4d8",
  bar(0, 0, W, 20, "#123a5c") + txt(12, 14, "user.site", 9, "#ffffff") +
  bar(20, 34, 280, 96, "#f3f0e6", ' stroke="#1a1a1a" stroke-width="2"') + bar(20, 34, 280, 18, "#0b7285") +
  bar(36, 66, 60, 46, "#e8e4d8", ' stroke="#1a1a1a" stroke-width="2"') +
  bar(108, 66, 150, 8, "#1a1a1a") + bar(108, 82, 120, 5, "#8a8674") + bar(108, 96, 140, 5, "#8a8674") +
  bar(0, 176, W, 24, "#f3f0e6", ' stroke="#1a1a1a"') + bar(8, 182, 44, 12, "#0b7285") + bar(60, 182, 60, 12, "#e8e4d8", ' stroke="#1a1a1a"'));

t["template-27"] = wrap("#0c0c0c",
  txt(16, 46, "Name", 30, "#f5f2ea", ' font-family="Georgia,serif"') +
  bar(16, 60, 180, 4, "#f2b705") +
  txt(16, 96, "Signature", 24, "#f2b705", ' font-family="Georgia,serif" font-style="italic"') +
  bar(16, 108, 288, 1, "#2a2a2a") +
  bar(16, 124, 140, 56, "#171717") + bar(164, 124, 140, 56, "#171717") + bar(16, 124, 140, 3, "#f2b705"));

/* Animated, illustration-led templates */
t["template-28"] = wrap("#070a16",
  bar(0, 0, W, 22, "#0d1226") + txt(14, 15, "Prism", 11, "#35d0ba", ' font-weight="700"') +
  `<circle cx="90" cy="96" r="54" fill="#35d0ba" opacity="0.22"/>` +
  `<circle cx="150" cy="76" r="46" fill="#7c6cf0" opacity="0.24"/>` +
  `<circle cx="210" cy="110" r="40" fill="#ffb020" opacity="0.16"/>` +
  txt(20, 74, "Name", 22, "#eef1fa", ' font-weight="800"') +
  bar(20, 88, 96, 5, "#9aa4c4") +
  `<path d="M244 60 L296 132 L192 132 Z" fill="none" stroke="#eef1fa" stroke-width="2"/>` +
  `<path d="M244 96 L318 74" stroke="#35d0ba" stroke-width="3"/>` +
  `<path d="M244 96 L318 104" stroke="#7c6cf0" stroke-width="2.4"/>` +
  `<path d="M244 96 L318 130" stroke="#ffb020" stroke-width="2"/>` +
  bar(16, 150, 88, 38, "#0d1226", ' stroke="#ffffff" stroke-opacity="0.14"') +
  bar(112, 150, 88, 38, "#0d1226", ' stroke="#ffffff" stroke-opacity="0.14"') +
  bar(208, 150, 96, 38, "#0d1226", ' stroke="#ffffff" stroke-opacity="0.14"'));

t["template-29"] = wrap("#fdfaf2",
  bar(0, 0, W, 22, "#fdfaf2") + txt(14, 15, "Sketchbook", 11, "#22303a", ' font-weight="700"') +
  bar(28, 0, 2, 200, "#d9542b", ' opacity="0.32"') +
  txt(20, 62, "Name", 24, "#22303a", ' font-family="Bradley Hand, Segoe Print, cursive"') +
  `<path d="M20 70 C60 64 96 74 132 68" fill="none" stroke="#3a6ea5" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M244 52 C258 68 266 96 266 122 L266 150 C266 156 262 160 256 160 L236 160 C230 160 226 156 226 150 L226 122 C226 96 234 68 244 52 Z" fill="none" stroke="#22303a" stroke-width="2.2"/>` +
  `<circle cx="246" cy="106" r="9" fill="none" stroke="#22303a" stroke-width="2"/>` +
  `<path d="M238 168 C240 178 243 184 246 190 C249 184 252 178 254 168" fill="none" stroke="#d9542b" stroke-width="2"/>` +
  bar(20, 100, 180, 44, "#fffdf6", ' stroke="#22303a" stroke-width="2.4"') +
  bar(32, 112, 110, 6, "#55636e") + bar(32, 126, 140, 6, "#55636e"));

t["template-30"] = wrap("#05060f",
  `<circle cx="46" cy="46" r="1.6" fill="#eef1ff"/><circle cx="120" cy="30" r="1.3" fill="#eef1ff"/>` +
  `<circle cx="278" cy="52" r="1.5" fill="#eef1ff"/><circle cx="60" cy="160" r="1.4" fill="#eef1ff"/>` +
  `<circle cx="290" cy="170" r="1.6" fill="#eef1ff"/><circle cx="176" cy="182" r="1.2" fill="#eef1ff"/>` +
  `<ellipse cx="196" cy="106" rx="76" ry="22" fill="none" stroke="#ffd166" stroke-width="4" transform="rotate(-18 196 106)"/>` +
  `<circle cx="196" cy="102" r="40" fill="#3d7bd6"/>` +
  `<ellipse cx="182" cy="90" rx="18" ry="10" fill="#ffffff" opacity="0.16"/>` +
  `<circle cx="252" cy="58" r="8" fill="#ffd166"/>` +
  txt(20, 172, "Name", 20, "#e9ecff", ' font-weight="800"') +
  bar(20, 182, 96, 4, "#9aa4cc"));

t["template-31"] = wrap("#0b3d68",
  bar(0, 0, W, 22, "#0a3560") + txt(14, 15, "Blueprint", 11, "#ffd24a", ' font-family="ui-monospace, Menlo, monospace"') +
  bar(16, 34, 288, 1, "#eaf3ff", ' opacity="0.22"') + bar(16, 74, 288, 1, "#eaf3ff", ' opacity="0.22"') +
  bar(16, 114, 288, 1, "#eaf3ff", ' opacity="0.22"') + bar(16, 154, 288, 1, "#eaf3ff", ' opacity="0.22"') +
  bar(76, 34, 1, 160, "#eaf3ff", ' opacity="0.22"') + bar(156, 34, 1, 160, "#eaf3ff", ' opacity="0.22"') +
  `<path d="M108 132 L196 96 L284 132 L196 168 Z" fill="none" stroke="#eaf3ff" stroke-width="2"/>` +
  `<path d="M108 132 L108 108 L196 72 L196 96 M284 132 L284 108 L196 72 M196 72 L196 46" fill="none" stroke="#eaf3ff" stroke-width="2"/>` +
  `<circle cx="196" cy="46" r="7" fill="none" stroke="#ffd24a" stroke-width="2"/>` +
  `<path d="M108 186 L284 186" stroke="#ffd24a" stroke-width="1.4" stroke-dasharray="4 4"/>` +
  txt(196, 198, "W = 176", 9, "#eaf3ff", ' font-family="ui-monospace, Menlo, monospace" text-anchor="middle"'));

t["template-32"] = wrap("#f4efe6",
  bar(0, 0, W, 22, "#efe8db") + txt(14, 15, "Origami", 11, "#1d2340", ' font-weight="700"') +
  `<polygon points="60,86 112,150 60,178" fill="#3d4fb5"/>` +
  `<polygon points="60,86 8,150 60,178" fill="#2b3a8f"/>` +
  `<polygon points="8,150 60,178 2,192" fill="#5668cf"/>` +
  `<polygon points="112,150 60,178 118,192" fill="#22307a"/>` +
  `<polygon points="60,178 2,192 34,196" fill="#c2603f"/>` +
  `<polygon points="60,178 118,192 86,196" fill="#a44d31"/>` +
  txt(132, 92, "Name", 22, "#1d2340", ' font-weight="800"') +
  bar(132, 104, 108, 5, "#5c6178") +
  bar(132, 128, 172, 46, "#fbf8f2", ' stroke="#1d2340" stroke-opacity="0.14"') +
  bar(132, 128, 172, 3, "#2b3a8f"));

/* Cybersecurity, futuristic animation */
t["template-33"] = wrap("#04101c",
  bar(0, 0, W, 22, "#08202f") + txt(14, 15, "Sentinel", 11, "#22d3ee", ' font-weight="700"') +
  `<circle cx="196" cy="106" r="62" fill="none" stroke="#22d3ee" stroke-width="1" opacity="0.28"/>` +
  `<circle cx="196" cy="106" r="44" fill="none" stroke="#22d3ee" stroke-width="1" opacity="0.24"/>` +
  `<circle cx="196" cy="106" r="26" fill="none" stroke="#22d3ee" stroke-width="1" opacity="0.2"/>` +
  `<path d="M134 106 H258 M196 44 V168" stroke="#22d3ee" stroke-width="0.9" opacity="0.24"/>` +
  `<path d="M196 106 L196 44 A62 62 0 0 1 250 84 Z" fill="#22d3ee" opacity="0.22"/>` +
  `<circle cx="228" cy="80" r="3.2" fill="#5eead4"/><circle cx="166" cy="132" r="2.8" fill="#fbbf24"/>` +
  `<circle cx="214" cy="142" r="3" fill="#22d3ee"/>` +
  txt(18, 70, "Name", 20, "#dff4ff", ' font-weight="800"') +
  bar(18, 82, 84, 4, "#7fa8c4") +
  bar(18, 98, 96, 22, "#0e2238", ' stroke="#22d3ee" stroke-opacity="0.22"') +
  `<path d="M24 116 H30 M34 116 H40 M44 116 H50 M54 116 H60 M64 116 H70 M74 116 H80" stroke="#5eead4" stroke-width="4" opacity="0.6"/>` +
  bar(18, 132, 96, 22, "#0e2238", ' stroke="#22d3ee" stroke-opacity="0.22"') +
  `<path d="M24 150 H30 M34 150 H40 M44 150 H50 M54 150 H60 M64 150 H70 M74 150 H80" stroke="#22d3ee" stroke-width="4" opacity="0.45"/>` +
  bar(18, 166, 284, 1, "#22d3ee", ' opacity="0.2"') +
  txt(18, 186, "CTF / CERTIFICATIONS", 9, "#7fa8c4", ' font-family="ui-monospace, Menlo, monospace"'));

t["template-34"] = wrap("#0a0d0a",
  bar(0, 0, W, 22, "#0d120c") + txt(14, 15, "Cipher", 11, "#c8ff3d", ' font-family="ui-monospace, Menlo, monospace" font-weight="700"') +
  txt(18, 58, "Name", 22, "#e9f5d8", ' font-family="ui-monospace, Menlo, monospace" font-weight="800"') +
  bar(18, 70, 110, 4, "#8fa382") +
  `<circle cx="238" cy="106" r="56" fill="none" stroke="#c8ff3d" stroke-width="1.6" opacity="0.75"/>` +
  `<circle cx="238" cy="106" r="40" fill="none" stroke="#c8ff3d" stroke-width="1" opacity="0.3" stroke-dasharray="4 7"/>` +
  `<path d="M238 76 A18 18 0 0 1 256 94 A18 18 0 0 1 245 111 L245 131 A5 5 0 0 1 231 131 L231 111 A18 18 0 0 1 220 94 A18 18 0 0 1 238 76 Z" fill="none" stroke="#c8ff3d" stroke-width="2"/>` +
  `<circle cx="238" cy="94" r="4.5" fill="#c8ff3d"/>` +
  txt(18, 104, "0x0000", 9, "#8fa382", ' font-family="ui-monospace, Menlo, monospace"') +
  bar(18, 112, 190, 1, "#c8ff3d", ' opacity="0.18"') +
  txt(18, 132, "0x0010", 9, "#8fa382", ' font-family="ui-monospace, Menlo, monospace"') +
  bar(18, 140, 190, 1, "#c8ff3d", ' opacity="0.18"') +
  txt(18, 160, "0x0020", 9, "#8fa382", ' font-family="ui-monospace, Menlo, monospace"') +
  bar(18, 168, 190, 1, "#c8ff3d", ' opacity="0.18"') +
  txt(18, 188, "0x0030", 9, "#8fa382", ' font-family="ui-monospace, Menlo, monospace"'));

t["template-35"] = wrap("#0b0714",
  bar(0, 0, W, 22, "#140c22") + txt(14, 15, "Gridlock", 11, "#22e0ff", ' font-weight="700"') +
  `<circle cx="248" cy="112" r="52" fill="#ff2d95" opacity="0.75"/>` +
  `<rect x="196" y="112" width="104" height="4" fill="#0b0714"/>` +
  `<rect x="196" y="124" width="104" height="6" fill="#0b0714"/>` +
  `<rect x="196" y="138" width="104" height="8" fill="#0b0714"/>` +
  `<rect x="196" y="154" width="104" height="11" fill="#0b0714"/>` +
  `<path d="M196 168 H300" stroke="#22e0ff" stroke-width="1.4"/>` +
  `<path d="M206 168 L214 196 M226 168 L232 196 M246 168 L248 196 M266 168 L262 196 M286 168 L276 196" stroke="#22e0ff" stroke-width="0.9" opacity="0.5"/>` +
  `<path d="M202 176 H298 M200 188 H300" stroke="#22e0ff" stroke-width="0.9" opacity="0.4"/>` +
  txt(18, 66, "Name", 22, "#f0e8ff", ' font-weight="800"') +
  bar(18, 78, 120, 4, "#a394c0") +
  bar(18, 100, 150, 40, "#1f1230", ' stroke="#ff2d95" stroke-opacity="0.4"') +
  bar(18, 100, 150, 3, "#ff2d95") +
  bar(18, 150, 150, 40, "#1f1230", ' stroke="#22e0ff" stroke-opacity="0.4"') +
  bar(18, 150, 150, 3, "#22e0ff"));

t["template-36"] = wrap("#0d1117",
  bar(0, 0, W, 22, "#121821") + txt(14, 15, "Vault", 11, "#5eead4", ' font-weight="700"') +
  `<ellipse cx="196" cy="108" rx="72" ry="78" fill="none" stroke="#5eead4" stroke-width="0.8" opacity="0.26"/>` +
  `<ellipse cx="196" cy="108" rx="72" ry="78" fill="none" stroke="#5eead4" stroke-width="0.8" opacity="0.2" transform="rotate(60 196 108)"/>` +
  `<path d="M196 42 L240 58 L240 104 L196 118 L152 104 L152 58 Z" fill="none" stroke="#5eead4" stroke-width="1.2" opacity="0.75"/>` +
  `<path d="M196 56 L228 68 L228 100 L196 110 L164 100 L164 68 Z" fill="none" stroke="#5eead4" stroke-width="1.1" opacity="0.6"/>` +
  `<path d="M196 70 L216 78 L216 96 L196 104 L176 96 L176 78 Z" fill="none" stroke="#5eead4" stroke-width="1" opacity="0.45"/>` +
  `<path d="M196 82 L206 86 L206 94 L196 98 L186 94 L186 86 Z" fill="none" stroke="#5eead4" stroke-width="1" opacity="0.35"/>` +
  `<circle cx="196" cy="108" r="9" fill="none" stroke="#5eead4" stroke-width="1.4"/>` +
  `<circle cx="196" cy="108" r="3" fill="#5eead4"/>` +
  txt(18, 66, "Name", 20, "#e6edf5", ' font-weight="800"') +
  bar(18, 78, 96, 4, "#93a5b8") +
  bar(18, 100, 120, 26, "#ffffff", ' stroke="#94b0cd" stroke-opacity="0.2" fill-opacity="0.035"') +
  bar(18, 100, 120, 2, "#5eead4") +
  bar(18, 134, 120, 26, "#ffffff", ' stroke="#94b0cd" stroke-opacity="0.2" fill-opacity="0.035"') +
  bar(18, 134, 84, 2, "#5eead4") +
  bar(18, 168, 284, 1, "#94b0cd", ' opacity="0.2"'));

let count = 0;
for (const [id, svg] of Object.entries(t)) {
  fs.writeFileSync(path.join(out, id + ".svg"), svg + "\n");
  count++;
}
console.log("wrote", count, "thumbnails to", out);
