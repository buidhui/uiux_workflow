#!/usr/bin/env node
/**
 * prototype-audit.mjs: kiểm tự động prototype HTML của UIUX-Workflow (E3, bậc 2 trong
 * `engine/knowledge/prototyping.md` mục Cách kiểm prototype).
 *
 * Mở prototype bằng Chromium của Playwright, đi qua từng màn (điều hướng hash `#/scr-1`),
 * chụp ở nhiều cỡ màn hình và chạy các kiểm cấu trúc: tràn ngang, vùng chạm nhỏ, focus không
 * nhìn thấy, phần tử tương tác thiếu tên, ảnh thiếu alt, tương phản chữ gần đúng, lỗi console.
 * Kết quả là gợi ý để kiểm tiếp, không thay review ở R1; tương tác (bấm, nhập) không được kiểm.
 *
 * Cách chạy (cài một lần, xem engine/scripts/README.md):
 *   node engine/scripts/prototype-audit.mjs --file <đường dẫn index.html> --out <thư mục kết quả>
 *   Tuỳ chọn: --target 24          ngưỡng vùng chạm (px), mặc định 24 theo WCAG 2.2 mức AA (2.5.8);
 *                                  dùng ngưỡng sản phẩm chọn ở Product KB mục 9 nếu có
 *             --routes "#/scr-1,#/scr-2"   danh sách màn; không truyền thì tự tìm liên kết `#/...`
 *             --viewports 360,768,1440     cỡ màn hình (px chiều rộng); mặc định sáu cỡ
 *             --url <http...>              kiểm một trang đang chạy thay cho file
 *             --executable <path>          đường dẫn Chromium khi không tự tìm được
 *
 * Dựa trên `stack/scripts/design-audit.mjs` của ui-ux-pro-max-skill
 * (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Copyright (c) 2024 Next Level Builder,
 * giấy phép MIT; toàn văn giấy phép ở engine/scripts/THIRD_PARTY_NOTICES.md.
 * Thay đổi so với bản gốc: đi qua từng màn theo hash, ngưỡng vùng chạm theo WCAG 2.2 AA và cấu
 * hình được, kiểm vùng chạm ở mọi cỡ màn hình, bỏ qua phần tử disabled khi tính tương phản,
 * báo cáo tiếng Việt, bỏ kiểm h1 và kích thước ảnh (thuộc phạm vi dựng web của Dev).
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const DEFAULT_WIDTHS = [360, 390, 768, 1024, 1440, 1920];
const HEIGHT_OF = (w) => (w <= 480 ? 800 : w <= 1024 ? 900 : 1000);

function parseArgs(argv) {
  const args = { out: 'prototype-audit', target: 24 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url') args.url = argv[++i];
    else if (a === '--file') args.file = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--target') args.target = Number(argv[++i]);
    else if (a === '--routes') args.routes = argv[++i].split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--viewports') args.widths = argv[++i].split(',').map((s) => Number(s.trim())).filter((n) => n > 0);
    else if (a === '--executable') args.executable = argv[++i];
  }
  if (!args.url && !args.file) {
    console.error('Cần --file <index.html> hoặc --url <http...>');
    process.exit(1);
  }
  if (!(args.target > 0)) args.target = 24;
  return args;
}

// Chạy trong trang. Trả về danh sách phát hiện của màn và cỡ màn hình hiện tại.
function inPageChecks(target) {
  const findings = [];
  const push = (severity, check, message, detail) => findings.push({ severity, check, message, detail });
  const vw = window.innerWidth;
  const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && el.offsetParent !== null; };
  const label = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');

  // 1. Tràn ngang
  const docW = document.documentElement.scrollWidth;
  if (docW > vw + 1) {
    const wide = [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().right > vw + 1).slice(0, 5).map(label);
    push('cao', 'tràn ngang', `Trang rộng ${docW}px ở khung ${vw}px, có thanh cuộn ngang.`, wide.join(', '));
  }

  // 2. Ảnh thiếu alt
  const noAlt = [...document.querySelectorAll('img')].filter((im) => visible(im) && im.getAttribute('alt') === null);
  if (noAlt.length) push('cao', 'alt của ảnh', `${noAlt.length} ảnh thiếu thuộc tính alt (1.1.1).`);

  // 3. Vùng chạm nhỏ hơn ngưỡng (2.5.8), bỏ qua liên kết nằm trong đoạn văn
  const controls = [...document.querySelectorAll('a[href],button,[role=button],input:not([type=hidden]),select,textarea')]
    .filter((el) => visible(el) && !el.disabled && !(el.tagName === 'A' && el.closest('p,li') && el.parentElement.childNodes.length > 1));
  const small = controls.filter((el) => { const r = el.getBoundingClientRect(); return r.width < target || r.height < target; });
  if (small.length) push('trung bình', 'vùng chạm', `${small.length} phần tử tương tác nhỏ hơn ${target}x${target}px; kiểm ngoại lệ khoảng cách của 2.5.8 trước khi ghi finding.`, small.slice(0, 5).map(label).join(', '));

  // 4. Focus nhìn thấy được (lấy mẫu)
  const focusables = controls.slice(0, 25);
  let noFocus = 0;
  for (const el of focusables) {
    el.focus();
    const s = getComputedStyle(el);
    const hasOutline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    const hasShadow = s.boxShadow && s.boxShadow !== 'none';
    if (!hasOutline && !hasShadow) noFocus++;
    el.blur();
  }
  if (noFocus > 0) push('cao', 'focus', `${noFocus}/${focusables.length} phần tử tương tác lấy mẫu không có chỉ báo focus nhìn thấy được (2.4.7).`);

  // 5. Tên cho trình đọc màn hình
  const nameless = controls.filter((el) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
      const id = el.getAttribute('id');
      return !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby') && !(id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) && !el.closest('label');
    }
    const text = (el.textContent || '').trim();
    const named = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title');
    const hasImg = el.querySelector('img[alt]:not([alt=""]), svg[aria-label]');
    return !text && !named && !hasImg;
  });
  if (nameless.length) push('cao', 'tên trợ năng', `${nameless.length} phần tử tương tác không có tên cho trình đọc màn hình (4.1.2, 3.3.2).`, nameless.slice(0, 5).map(label).join(', '));

  // 6. Meta của tài liệu
  if (!document.querySelector('meta[name=viewport]')) push('cao', 'viewport', 'Thiếu thẻ meta viewport; hiển thị trên di động sẽ sai.');
  if (!document.documentElement.getAttribute('lang')) push('thấp', 'lang', 'Thẻ html thiếu thuộc tính lang (3.1.1).');

  // 7. Tương phản chữ gần đúng (lấy mẫu; nền lấy từ lớp cha gần nhất có màu nền đặc)
  const toRgb = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
  const bgOf = (el) => { let n = el; while (n) { const c = toRgb(getComputedStyle(n).backgroundColor); if (c && c.a !== 0) return c; n = n.parentElement; } return { r: 255, g: 255, b: 255, a: 1 }; };
  const textEls = [...document.querySelectorAll('p,span,a,li,h1,h2,h3,h4,h5,button,label,td,th,div')]
    .filter((el) => visible(el) && !el.closest('[disabled],[aria-disabled=true]') && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1))
    .slice(0, 150);
  let low = 0;
  for (const el of textEls) {
    const s = getComputedStyle(el);
    const fg = toRgb(s.color); if (!fg) continue;
    const size = parseFloat(s.fontSize);
    const bold = parseInt(s.fontWeight, 10) >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    if (ratio(fg, bgOf(el)) < need - 0.05) low++;
  }
  if (low > 0) push('trung bình', 'tương phản', `Khoảng ${low}/${textEls.length} đoạn chữ lấy mẫu dưới ngưỡng 1.4.3 (tính gần đúng, đo lại trên Figma trước khi ghi finding).`);

  return findings;
}

async function launchBrowser(executable) {
  const exe = executable || process.env.PW_EXECUTABLE_PATH;
  return chromium.launch(exe ? { executablePath: exe } : {});
}

async function discoverRoutes(page) {
  return page.evaluate(() => {
    const set = new Set();
    document.querySelectorAll('a[href^="#/"], [data-route^="#/"]').forEach((el) => set.add(el.getAttribute('href') || el.getAttribute('data-route')));
    return [...set];
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const base = args.url || pathToFileURL(resolve(args.file)).href;
  const widths = args.widths && args.widths.length ? args.widths : DEFAULT_WIDTHS;
  const outDir = resolve(args.out);
  await mkdir(`${outDir}/screenshots`, { recursive: true });

  const browser = await launchBrowser(args.executable);
  const consoleErrors = [];

  // Tìm danh sách màn ở cỡ lớn nhất, sau đó kiểm từng màn ở từng cỡ.
  let routes = args.routes;
  if (!routes) {
    const ctx = await browser.newContext({ viewport: { width: Math.max(...widths), height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'load', timeout: 30000 });
    routes = await discoverRoutes(page);
    await ctx.close();
  }
  // Có danh sách màn thì kiểm từng màn; không có thì chỉ kiểm trang đầu.
  const named = routes.filter((r) => r !== '');
  const targets = named.length ? named : [''];

  const results = [];
  for (const route of targets) {
    for (const w of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: HEIGHT_OF(w) }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const tag = `${route || 'trang-dau'}@${w}`;
      page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`[${tag}] ${m.text()}`); });
      page.on('pageerror', (e) => consoleErrors.push(`[${tag}] ${e.message}`));
      await page.goto(base + route, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(400);
      const name = `${(route || 'trang-dau').replace(/[^a-z0-9-]+/gi, '_').replace(/^_+/, '')}-${w}`;
      const shot = `screenshots/${name}.png`;
      await page.screenshot({ path: `${outDir}/${shot}`, fullPage: true });
      const findings = await page.evaluate(inPageChecks, args.target);
      results.push({ route: route || '(trang đầu)', width: w, shot, findings });
      await ctx.close();
    }
  }
  await browser.close();

  const agg = new Map();
  for (const { route, width, findings } of results) {
    for (const f of findings) {
      const key = `${f.check}|${f.message}|${route}`;
      if (!agg.has(key)) agg.set(key, { ...f, route, widths: [] });
      agg.get(key).widths.push(width);
    }
  }
  const order = { 'cao': 0, 'trung bình': 1, 'thấp': 2 };
  const all = [...agg.values()].sort((a, b) => order[a.severity] - order[b.severity]);
  const counts = { 'cao': 0, 'trung bình': 0, 'thấp': 0 };
  all.forEach((f) => counts[f.severity]++);

  const lines = [];
  lines.push(`# Kiểm prototype tự động: ${args.file || args.url}`, '');
  lines.push(`Bậc kiểm: 2 (đã chụp màn, tương tác chưa kiểm). Số màn: ${targets.length}. Cỡ màn hình: ${widths.join(', ')} px. Ngưỡng vùng chạm: ${args.target} px.`, '');
  lines.push('Kết quả là gợi ý để kiểm tiếp, không phải finding. Tương phản tính gần đúng; mọi điểm cần đo lại trên Figma theo `engine/knowledge/accessibility.md` trước khi ghi vào review.', '');
  lines.push(`Phát hiện: ${counts['cao']} mức cao, ${counts['trung bình']} mức trung bình, ${counts['thấp']} mức thấp. Lỗi console: ${new Set(consoleErrors.map((e) => e.replace(/^\[[^\]]+\] /, ''))).size} loại.`, '');
  if (consoleErrors.length) {
    const byText = new Map();
    for (const e of consoleErrors) { const m = e.match(/^\[([^\]]+)\] (.*)$/); const key = m ? m[2] : e; if (!byText.has(key)) byText.set(key, []); byText.get(key).push(m ? m[1] : ''); }
    lines.push('## Lỗi console', '', '| Lỗi | Gặp ở (màn@cỡ) |', '|---|---|');
    [...byText.entries()].slice(0, 20).forEach(([text, where]) => lines.push(`| \`${text.replace(/\|/g, '\\|')}\` | ${where.join(', ')} |`));
    lines.push('');
  }
  for (const sev of ['cao', 'trung bình', 'thấp']) {
    const group = all.filter((f) => f.severity === sev);
    if (!group.length) continue;
    lines.push(`## Mức ${sev}`, '');
    lines.push('| Màn | Kiểm | Phát hiện | Cỡ màn hình | Phần tử |', '|---|---|---|---|---|');
    for (const f of group) lines.push(`| ${f.route} | ${f.check} | ${f.message} | ${f.widths.join(', ')} | ${f.detail || ''} |`);
    lines.push('');
  }
  lines.push('## Ảnh chụp', '');
  results.forEach(({ route, width, shot }) => lines.push(`- ${route} ở ${width}px: \`${shot}\``));
  lines.push('');

  await writeFile(`${outDir}/report.md`, lines.join('\n'), 'utf8');
  await writeFile(`${outDir}/report.json`, JSON.stringify({ target: base, routes: targets, widths, tapTarget: args.target, consoleErrors, findings: all }, null, 2), 'utf8');
  console.log(`Xong: ${outDir}/report.md`);
  console.log(`${counts['cao']} cao · ${counts['trung bình']} trung bình · ${counts['thấp']} thấp · ${consoleErrors.length} lỗi console`);
  process.exit(counts['cao'] > 0 ? 2 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
