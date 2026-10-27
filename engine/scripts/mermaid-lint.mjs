#!/usr/bin/env node
/**
 * mermaid-lint.mjs: kiểm cú pháp tĩnh các khối ```mermaid trong file Markdown của UIUX-Workflow,
 * theo `engine/protocol/diagram-protocol.md` mục 3.
 *
 * Mỗi quy tắc ứng với một lỗi đã thử trên Mermaid 11.12: sơ đồ mắc lỗi đó không hiển thị. Thêm hai
 * quy tắc của chuẩn: `fill` phải đi kèm `color`, tối đa 20 nút mỗi sơ đồ. Chỉ dùng thư viện có sẵn
 * của Node, không cần `npm install`. Script kiểm tĩnh, không thay việc xem sơ đồ hiển thị.
 *
 * Cách chạy:
 *   node engine/scripts/mermaid-lint.mjs <file hoặc thư mục> [...]
 *   Thư mục được duyệt đệ quy, bỏ qua node_modules và .git. Mã thoát 1 khi có lỗi.
 *
 * Cùng bộ quy tắc với hàm lint_mermaid của po-tools.py trong PO-Workflow; sửa một bên thì sửa cả hai.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const TYPES = ['flowchart', 'graph', 'stateDiagram-v2', 'sequenceDiagram', 'erDiagram'];
const MAX_NODES = 20;
const FLOW_OPEN = /(?<![\w-])([A-Za-z_](?:[\w-]*\w)?)(\(\(\(|\(\(|\(\[|\[\(|\[\[|\[\/|\[\\|\{\{|\[|\(|\{|>)/g;
const FLOW_CLOSE = { '(((': ')))', '((': '))', '([': '])', '[(': ')]', '[[': ']]', '{{': '}}', '[': ']', '(': ')', '{': '}', '>': ']' };
const FLOW_BAD = /[()[\]{}|"@]/;
const FLOW_ARROW = String.raw`(?:<?-->|<?==>|<?-\.->|---|===|-\.-|--[ox]|&)`;
const SEQ_ARROW = /(-->>|->>|-->|->|--x|-x|--\)|-\))/;
const SEQ_KEYS = /^(participant|actor|note|alt|else|opt|loop|par|and|critical|option|break|rect|box|end|autonumber|activate|deactivate|title|create|destroy|links?)\b/i;

export function lintMermaid(block) {
  const out = [];
  let body = block.map((ln, k) => [k, ln.replace(/%%(?!\{).*$/, '').trimEnd()]).filter(([, ln]) => ln.trim());
  if (!body.length) return [[0, 'Khối mermaid rỗng']];
  let [k0, head] = body[0];
  if (head.trim().startsWith('%%{')) {
    out.push([k0, 'Không dùng khối %%{init}%%: màu và giao diện do nơi hiển thị quyết định']);
    body = body.slice(1);
    if (!body.length) return out;
    [k0, head] = body[0];
  }
  const words = head.trim().split(/\s+/);
  const kind = words[0];
  if (!TYPES.includes(kind)) return [...out, [k0, `Dòng đầu khối là '${kind}'; chuẩn chỉ dùng ${TYPES.join(', ')}`]];
  if ((kind === 'flowchart' || kind === 'graph') && (words.length > 2 || (words.length === 2 && !['TB', 'TD', 'BT', 'RL', 'LR'].includes(words[1]))))
    out.push([k0, "Dòng đầu chỉ ghi loại sơ đồ và hướng, như 'flowchart TD'; nút và mũi tên viết từ dòng sau"]);
  const rest = body.slice(1);
  for (const [k, ln] of rest) {
    const s = ln.trim();
    const m = s.match(/^(classDef|style)\s+(\S+)\s+(.*)$/);
    if (m && m[3].includes('fill') && !m[3].replaceAll('fill', '').includes('color'))
      out.push([k, `${m[1]} ${m[2]} có fill mà thiếu color: chữ khó đọc ở nền tối; thêm color:#000 hoặc màu chữ tương phản`]);
    if (/^click\s/.test(s)) out.push([k, 'Không dùng click: GitHub và hầu hết nơi hiển thị bỏ qua liên kết trong sơ đồ']);
  }
  if (kind === 'flowchart' || kind === 'graph') out.push(...lintFlow(rest));
  else if (kind === 'stateDiagram-v2') out.push(...lintState(rest));
  else if (kind === 'sequenceDiagram') out.push(...lintSeq(rest));
  else out.push(...lintEr(rest));
  return out;
}

function flowNodes(s, k, out, ids) {
  let pos = 0;
  for (;;) {
    FLOW_OPEN.lastIndex = pos;
    const m = FLOW_OPEN.exec(s);
    if (!m) return;
    const [, nid, op] = m;
    ids.add(nid);
    if (nid === 'end') out.push([k, "Mã nút 'end' trùng từ khoá đóng subgraph; đổi thành 'END' hoặc 'KET_THUC'"]);
    const start = m.index + m[0].length;
    let lab;
    if (op === '[/' || op === '[\\') {
      const cands = [s.indexOf('/]', start), s.indexOf('\\]', start)].filter((i) => i >= 0);
      const close = cands.length ? Math.min(...cands) : -1;
      const nxt = s.indexOf(']', start);
      if (close < 0 || (nxt >= 0 && nxt < close)) {
        out.push([k, `Nhãn của nút ${nid} bắt đầu bằng / hoặc \\ nên bị đọc thành hình thang; đặt nhãn trong ngoặc kép`]);
        pos = nxt >= 0 ? nxt + 1 : s.length;
        continue;
      }
      lab = s.slice(start, close);
      pos = close + 2;
    } else {
      const close = s.indexOf(FLOW_CLOSE[op], start);
      if (close < 0) {
        out.push([k, `Nút ${nid} mở '${op}' mà không có '${FLOW_CLOSE[op]}' đóng`]);
        return;
      }
      lab = s.slice(start, close);
      pos = close + FLOW_CLOSE[op].length;
    }
    lab = lab.trim();
    if (!lab.startsWith('"') && FLOW_BAD.test(lab))
      out.push([k, `Nhãn của nút ${nid} có ký tự ( ) [ ] { } | " hoặc @ mà không đặt trong ngoặc kép: ${nid}["${lab.replaceAll('"', "'")}"]`]);
  }
}

function lintFlow(rest) {
  const out = [];
  const ids = new Set();
  let depth = 0;
  const endRe = new RegExp(`(?:^|${FLOW_ARROW})\\s*end\\s*(?:$|${FLOW_ARROW})`);
  const splitRe = new RegExp(`${FLOW_ARROW}|--\\s[^-]*?\\s-->`);
  for (const [k, ln] of rest) {
    let s = ln.trim().replace(/"[^"]*"/g, '"…"');
    if (/^(classDef|class|style|linkStyle|click|direction)\b/.test(s)) continue;
    if (s === 'end') {
      depth -= 1;
      if (depth < 0) {
        out.push([k, "'end' thừa: không có subgraph nào đang mở"]);
        depth = 0;
      }
      continue;
    }
    const sg = s.match(/^subgraph\s+(.*)$/);
    if (sg) {
      depth += 1;
      const mt = sg[1].match(/^([\w-]+)\s*\[(.*)\]\s*$/);
      if (mt && !mt[2].trim().startsWith('"') && FLOW_BAD.test(mt[2]))
        out.push([k, `Tên subgraph ${mt[1]} có ký tự đặc biệt mà không đặt trong ngoặc kép`]);
      continue;
    }
    for (const [, lab] of s.matchAll(/\|([^|]*)\|/g)) {
      if (!lab.trim().startsWith('"') && FLOW_BAD.test(lab))
        out.push([k, `Nhãn mũi tên |${lab}| có ký tự ( ) [ ] { } " hoặc @ mà không đặt trong ngoặc kép: |"${lab.replaceAll('"', "'")}"|`]);
    }
    s = s.replace(/\|[^|]*\|/g, ' ');
    if (endRe.test(s) && s !== 'end') out.push([k, "Mã nút 'end' trùng từ khoá đóng subgraph; đổi thành 'END' hoặc 'KET_THUC'"]);
    flowNodes(s, k, out, ids);
    for (let t of s.split(splitRe)) {
      t = (t || '').trim();
      if (/^[A-Za-z_][\w-]*$/.test(t)) ids.add(t);
    }
  }
  if (depth > 0) out.push([rest.length ? rest[rest.length - 1][0] : 0, `Còn ${depth} subgraph chưa có dòng 'end'`]);
  if (ids.size > MAX_NODES) out.push([0, `Sơ đồ có ${ids.size} nút, quá ${MAX_NODES}: tách thành nhiều sơ đồ, mỗi sơ đồ một luồng hoặc một nhóm`]);
  return out;
}

function lintState(rest) {
  const out = [];
  const ids = new Set();
  for (const [k, ln] of rest) {
    const s = ln.trim();
    if (/^(class|style)\s/.test(s) && s.includes('[*]')) {
      out.push([k, 'Không gắn class hoặc style cho [*]']);
      continue;
    }
    let m = s.match(/^state\s+"([^"]*)"\s+as\s+(\w+)\s*\{?$/);
    if (s.startsWith('state "') && !m) {
      out.push([k, 'Khai báo trạng thái sai dạng state "<tên>" as <MÃ>; tên trạng thái không chứa dấu ngoặc kép']);
      continue;
    }
    if (m) {
      ids.add(m[2]);
      continue;
    }
    m = s.match(/^(\[\*\]|\w+)\s*-->\s*(\[\*\]|\w+)\s*(?::(.*))?$/);
    if (m) {
      for (const x of [m[1], m[2]]) if (x !== '[*]') ids.add(x);
      if (m[3] && m[3].includes(':'))
        out.push([k, `Nhãn sự kiện '${m[3].trim()}' có dấu hai chấm; bỏ dấu hai chấm hoặc thay bằng dấu phẩy`]);
    }
  }
  if (ids.size > MAX_NODES) out.push([0, `Sơ đồ có ${ids.size} trạng thái, quá ${MAX_NODES}: tách theo nhóm trạng thái hoặc dùng state lồng`]);
  return out;
}

function lintSeq(rest) {
  const out = [];
  let depth = 0;
  for (const [k, ln] of rest) {
    const s = ln.trim();
    if (/^(participant|actor)\s+end\b/.test(s)) out.push([k, "Tên participant 'end' trùng từ khoá đóng khối; đổi tên"]);
    if (/^(alt|opt|loop|par|critical|break|rect|box)\b/.test(s)) depth += 1;
    else if (s === 'end') {
      depth -= 1;
      if (depth < 0) {
        out.push([k, "'end' thừa: không có khối alt, opt, loop, par nào đang mở"]);
        depth = 0;
      }
    }
    if (/^note\b/i.test(s)) {
      if (s.replace(/#\w+;/g, '').includes(';')) out.push([k, 'Dấu chấm phẩy trong Note làm vỡ sơ đồ; thay bằng dấu phẩy']);
      continue;
    }
    if (SEQ_KEYS.test(s) || !SEQ_ARROW.test(s)) continue;
    if (!s.includes(':')) out.push([k, 'Thông điệp thiếu dấu hai chấm trước nội dung: A->>B: nội dung']);
    else if (s.slice(s.indexOf(':') + 1).replace(/#\w+;/g, '').includes(';'))
      out.push([k, 'Dấu chấm phẩy trong thông điệp làm vỡ sơ đồ; thay bằng dấu phẩy']);
  }
  if (depth > 0) out.push([rest.length ? rest[rest.length - 1][0] : 0, `Còn ${depth} khối alt, opt, loop, par chưa có dòng 'end'`]);
  return out;
}

function lintEr(rest) {
  const out = [];
  let inside = false;
  for (const [k, ln] of rest) {
    const s = ln.trim();
    const m = s.match(/^\S+\s+[|}o]{1,2}(?:--|\.\.)[|{o]{1,2}\s+\S+\s*:\s*(.+)$/);
    if (m && !m[1].startsWith('"') && /[()[\]{}"@:;|]/.test(m[1]))
      out.push([k, `Nhãn quan hệ '${m[1]}' có ký tự đặc biệt mà không đặt trong ngoặc kép`]);
    const parts = [];
    if (s.includes('{')) {
      inside = true;
      parts.push(s.slice(s.indexOf('{') + 1));
    } else if (inside) parts.push(s);
    for (let p of parts) {
      if (p.includes('}')) {
        p = p.slice(0, p.indexOf('}'));
        inside = false;
      }
      const w = p.trim().split(/\s+/);
      if (w[0] && ['PK', 'FK', 'UK'].includes(w[0].toUpperCase()))
        out.push([k, 'Thuộc tính viết sai thứ tự: loại dữ liệu, tên, sau đó mới tới PK, FK, UK']);
    }
  }
  return out;
}

/** [[số dòng tính từ 1, lời báo]] cho mọi khối mermaid trong một file Markdown. */
export function lintMarkdown(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*```\s*mermaid\b/.test(lines[i])) continue;
    let j = i + 1;
    while (j < lines.length && !lines[j].trim().startsWith('```')) j++;
    for (const [k, msg] of lintMermaid(lines.slice(i + 1, j))) out.push([i + 2 + k, msg]);
    i = j;
  }
  return out;
}

function collect(path, files) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const name of readdirSync(path).sort()) {
      if (name === 'node_modules' || name === '.git') continue;
      collect(join(path, name), files);
    }
  } else if (extname(path) === '.md') files.push(path);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Cách chạy: node engine/scripts/mermaid-lint.mjs <file hoặc thư mục> [...]');
    process.exit(2);
  }
  const files = [];
  for (const a of args) collect(a, files);
  let n = 0;
  for (const f of files) {
    for (const [line, msg] of lintMarkdown(readFileSync(f, 'utf8'))) {
      console.log(`${f}:${line} ${msg}`);
      n++;
    }
  }
  console.log(n ? `Kết luận: ${n} lỗi sơ đồ trong ${files.length} file.` : `Kết luận: ${files.length} file, không có lỗi sơ đồ.`);
  process.exit(n ? 1 : 0);
}
