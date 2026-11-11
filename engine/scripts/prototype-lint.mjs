#!/usr/bin/env node
/**
 * prototype-lint.mjs: kiểm tĩnh file HTML prototype của UIUX-Workflow theo `engine/knowledge/prototyping.md`
 * mục Chuẩn file, không cần trình duyệt.
 *
 * Kiểm khung tài liệu (doctype, lang, charset, title, meta định danh), tài nguyên ngoài (thư viện phải ghim
 * đúng version, không đi ra ngoài thư mục prototype), phần tử bị cấm, lời gọi mạng, dữ liệu không ổn định,
 * cú pháp JavaScript của từng khối script, và màn được liên kết mà không thấy định nghĩa. Chỉ dùng thư viện
 * có sẵn của Node, không cần `npm install`. Đạt yêu cầu tự động của bậc 3 ở `prototyping.md` mục Cách kiểm
 * prototype; không thay việc mở file trên trình duyệt.
 *
 * Cách chạy:
 *   node engine/scripts/prototype-lint.mjs <file .html hoặc thư mục> [...]
 *   Thư mục được duyệt đệ quy, bỏ qua node_modules, .git, audit và screenshots. Mã thoát 1 khi có lỗi;
 *   cảnh báo không làm đổi mã thoát.
 *
 * Ý tưởng khung tài liệu tự đủ, meta định danh và kiểm cấu trúc tĩnh lấy từ HTML artifact protocol và
 * sensor html-shape của AWS AI-DLC (nhánh feature/review-ui-html-artifacts, giấy phép MIT-0); mã viết mới.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const REQUIRED_META = ['uiux-intent', 'uiux-screens', 'uiux-version'];
const VERSION = /\d+\.\d+\.\d+/;
const FLOATING = /(?:@|\/)(?:latest|next|beta|canary)\b/i;
const FONT_HOSTS = /^(?:https?:)?\/\/fonts\.(?:googleapis|gstatic)\.com\//i;
const SKIP_DIRS = new Set(['node_modules', '.git', 'audit', 'screenshots']);

const norm = (s) => s.replace(/^#?\/?/, '').toLowerCase().replace(/[^a-z0-9]/g, '');

function blankComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

function lineAt(text, index) {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
}

function classifyUrl(url) {
  const u = url.trim();
  if (!u || u.startsWith('#') || /^(?:data|blob|mailto|tel|javascript):/i.test(u)) return null;
  if (/^file:/i.test(u) || /^\/(?:Users|home|[A-Za-z]:)/.test(u) || /^[A-Za-z]:\\/.test(u)) {
    return ['Lỗi', `đường dẫn tuyệt đối trên máy: ${u}. Đặt tài nguyên cạnh file prototype`];
  }
  if (/^(?:https?:)?\/\//i.test(u)) {
    if (FONT_HOSTS.test(u)) return ['Cảnh báo', `font tải từ Google Fonts không ghim được version: ${u}. Chấp nhận khi KB mục 7 ghi cách tải này`];
    if (FLOATING.test(u) || !VERSION.test(u)) return ['Lỗi', `tài nguyên ngoài chưa ghim version (URL cần có dạng x.y.z; ảnh thì đặt cạnh file prototype): ${u}`];
    return null;
  }
  if (u.split(/[?#]/)[0].split('/').includes('..')) {
    return ['Lỗi', `đường dẫn đi ra ngoài thư mục prototype: ${u}. File phải mở được khi chỉ có thư mục prototype`];
  }
  return null;
}

function checkScriptSyntax(code, isModule) {
  const dir = mkdtempSync(join(tmpdir(), 'prototype-lint-'));
  const file = join(dir, isModule ? 'khoi.mjs' : 'khoi.cjs');
  try {
    writeFileSync(file, code, 'utf8');
    const r = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (r.status === 0) return null;
    const out = `${r.stderr || ''}${r.stdout || ''}`;
    const line = Number((out.match(/:(\d+)\r?\n/) || [])[1] || 1);
    const msg = (out.match(/^(SyntaxError: .*)$/m) || [])[1] || out.trim().split('\n').pop();
    return [line, msg];
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function lintPrototype(source) {
  const out = [];
  const html = blankComments(source);
  const add = (index, level, msg) => out.push([lineAt(html, index), level, msg]);

  if (!/^﻿?\s*<!doctype\s+html\s*>/i.test(html)) add(0, 'Lỗi', 'thiếu <!doctype html> ở đầu file');
  const htmlTag = html.match(/<html\b[^>]*>/i);
  if (!htmlTag || !attr(htmlTag[0], 'lang')?.trim()) add(htmlTag ? htmlTag.index : 0, 'Lỗi', 'thẻ <html> thiếu thuộc tính lang (ví dụ lang="vi")');
  if (!/<meta\s[^>]*charset\s*=/i.test(html)) add(0, 'Lỗi', 'thiếu <meta charset="utf-8">');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title || !title[1].trim()) add(title ? title.index : 0, 'Lỗi', 'thiếu <title> có nội dung');

  const metas = new Map();
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const name = attr(m[0], 'name');
    if (name) metas.set(name.toLowerCase(), [attr(m[0], 'content') || '', m.index]);
    if (/http-equiv\s*=\s*["']?refresh/i.test(m[0])) add(m.index, 'Lỗi', '<meta http-equiv="refresh"> không được dùng');
  }
  for (const name of REQUIRED_META) {
    if (!metas.has(name) || !metas.get(name)[0].trim()) add(0, 'Lỗi', `thiếu <meta name="${name}" content="..."> (xem prototyping.md mục Chuẩn file)`);
  }

  for (const m of html.matchAll(/<(iframe|object|embed)\b/gi)) add(m.index, 'Lỗi', `<${m[1].toLowerCase()}> không được dùng trong prototype`);
  for (const m of html.matchAll(/<form\b[^>]*>/gi)) if (attr(m[0], 'action') !== null) add(m.index, 'Lỗi', '<form> có action gửi dữ liệu đi; xử lý gửi form bằng script trong file');
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) if (attr(m[0], 'alt') === null) add(m.index, 'Cảnh báo', '<img> thiếu alt; ảnh trang trí dùng alt=""');

  const resources = [];
  for (const m of html.matchAll(/<(script|img|source|video|audio|track|link)\b[^>]*>/gi)) {
    const tag = m[1].toLowerCase();
    if (tag === 'link') {
      const rel = (attr(m[0], 'rel') || '').toLowerCase();
      if (!/stylesheet|preload|modulepreload|icon|manifest/.test(rel)) continue;
    }
    for (const a of ['src', 'href', 'poster']) {
      const v = attr(m[0], a);
      if (v !== null) resources.push([m.index, v]);
    }
    const srcset = attr(m[0], 'srcset');
    if (srcset) for (const part of srcset.split(',')) resources.push([m.index, part.trim().split(/\s+/)[0]]);
  }
  for (const m of html.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)) resources.push([m.index, m[2]]);
  for (const m of html.matchAll(/@import\s+(?:url\()?\s*['"]([^'"]+)['"]/gi)) resources.push([m.index, m[1]]);

  const literals = new Set();
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    const code = m[2];
    const start = m.index + m[0].indexOf('>') + 1;
    const type = (attr(`<s ${attrs}>`, 'type') || '').toLowerCase();
    if (attr(`<s ${attrs}>`, 'src') !== null && !code.trim()) continue;
    for (const s of code.matchAll(/(['"`])((?:(?!\1)[^\\\n]|\\.){1,80})\1/g)) literals.add(norm(s[2]));
    for (const s of code.matchAll(/\bimport\s*(?:[\w*{}\s,]+from\s*)?\(?\s*['"]([^'"]+)['"]/g)) resources.push([start + s.index, s[1]]);

    const checks = [
      [/\bfetch\s*\(/g, 'Lỗi', 'gọi fetch(): prototype không gọi API, dữ liệu mẫu đặt trong file'],
      [/\bXMLHttpRequest\b/g, 'Lỗi', 'dùng XMLHttpRequest: prototype không gọi API'],
      [/\bnew\s+(?:WebSocket|EventSource)\s*\(/g, 'Lỗi', 'mở kết nối mạng: prototype không gọi API'],
      [/\bnavigator\.sendBeacon\s*\(/g, 'Lỗi', 'gửi dữ liệu ra ngoài bằng sendBeacon'],
      [/\bMath\.random\s*\(/g, 'Cảnh báo', 'Math.random(): dữ liệu mẫu cần cố định để ảnh chụp các lần review so được với nhau'],
      [/\bcrypto\.randomUUID\s*\(/g, 'Cảnh báo', 'crypto.randomUUID(): mã sinh ngẫu nhiên làm dữ liệu mẫu đổi mỗi lần mở'],
      [/\bDate\.now\s*\(/g, 'Cảnh báo', 'Date.now(): dùng một mốc thời gian cố định cho dữ liệu mẫu'],
      [/\bnew\s+Date\s*\(\s*\)/g, 'Cảnh báo', 'new Date() không tham số: dùng một mốc thời gian cố định cho dữ liệu mẫu'],
    ];
    for (const [re, level, msg] of checks) for (const c of code.matchAll(re)) add(start + c.index, level, msg);

    if (type === 'application/json' || type === 'application/ld+json' || type === 'importmap') {
      try {
        const data = JSON.parse(code);
        if (type === 'importmap') for (const v of Object.values({ ...(data.imports || {}) })) resources.push([start, String(v)]);
      } catch (e) {
        add(start, 'Lỗi', `khối ${type} không phải JSON hợp lệ: ${e.message}`);
      }
      continue;
    }
    if (type && !['text/javascript', 'module', 'application/javascript'].includes(type)) continue;
    if (!code.trim()) continue;
    const err = checkScriptSyntax(code, type === 'module');
    if (err) out.push([lineAt(html, start) + err[0] - 1, 'Lỗi', `lỗi cú pháp JavaScript: ${err[1]}`]);
  }

  for (const [index, url] of resources) {
    const r = classifyUrl(url);
    if (r) add(index, r[0], r[1]);
  }

  const defined = new Set(literals);
  for (const m of html.matchAll(/\s(?:id|data-screen|data-route)\s*=\s*["']([^"']+)["']/gi)) defined.add(norm(m[1]));
  const seen = new Set();
  for (const m of html.matchAll(/\shref\s*=\s*["'](#\/[^"']*)["']/gi)) {
    const key = norm(m[1]);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    if (!defined.has(key)) add(m.index, 'Cảnh báo', `liên kết ${m[1]} không thấy màn tương ứng (id, data-screen hoặc khai báo trong script)`);
  }
  if (metas.has('uiux-screens')) {
    const [content, index] = metas.get('uiux-screens');
    for (const code of content.split(/[,\s]+/).filter(Boolean)) {
      if (!defined.has(norm(code))) add(index, 'Cảnh báo', `mã màn ${code} khai ở uiux-screens nhưng không thấy trong file`);
    }
  }

  return out.sort((a, b) => a[0] - b[0]);
}

function collect(path, files) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const name of readdirSync(path).sort()) {
      if (SKIP_DIRS.has(name)) continue;
      collect(join(path, name), files);
    }
  } else if (extname(path).toLowerCase() === '.html') files.push(path);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Cách chạy: node engine/scripts/prototype-lint.mjs <file .html hoặc thư mục> [...]');
    process.exit(2);
  }
  const files = [];
  for (const a of args) collect(a, files);
  let errors = 0;
  let warnings = 0;
  for (const f of files) {
    for (const [line, level, msg] of lintPrototype(readFileSync(f, 'utf8'))) {
      console.log(`${f}:${line} ${level}: ${msg}`);
      if (level === 'Lỗi') errors++;
      else warnings++;
    }
  }
  if (!files.length) console.log('Kết luận: không tìm thấy file .html nào.');
  else console.log(`Kết luận: ${files.length} file, ${errors} lỗi, ${warnings} cảnh báo.`);
  process.exit(errors ? 1 : 0);
}
