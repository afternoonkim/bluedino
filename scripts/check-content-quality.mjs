import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'data', 'lib'];
const banned = [
  'SEO 최적화', '애드센스 승인용', '운영자용', '개발자용', 'AI 작업', '포털화 작업',
  '검색엔진 상위노출용', '정비 중', '준비 중', '사용자 관점에서 직접 작성', '광고 영역', '저품질', '대량 생성',
];
const awkward = ['계좌은', '계좌을', '대출를', '조건를', '한도을', '기준를', '인지은', '인지을', '신용대출를', '주택담보대출를'];
const overused = ['함께 봐야 합니다', '함께 확인하는 편이 안전합니다', '단순히 혜택만 보고 결정하기보다'];
const files = [];
function walk(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return;
  for (const entry of fs.readdirSync(full)) {
    const p = path.join(full, entry);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(path.relative(ROOT, p));
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry)) files.push(p);
  }
}
SCAN_DIRS.forEach(walk);
const failures = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const word of [...banned, ...awkward]) {
    if (text.includes(word)) failures.push(`${path.relative(ROOT, file)}: 금지/오류 표현 "${word}"`);
  }
  for (const word of overused) {
    const count = text.split(word).length - 1;
    if (count > 3) failures.push(`${path.relative(ROOT, file)}: 반복 표현 "${word}" ${count}회`);
  }
}
function uniqueRate(file, field) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const values = [...text.matchAll(new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'g'))].map((m) => m[1]);
  if (values.length === 0) return { total: 0, unique: 0, rate: 1 };
  const unique = new Set(values).size;
  return { total: values.length, unique, rate: unique / values.length };
}
for (const file of fs.readdirSync(path.join(ROOT, 'data/finance')).filter((f) => f.endsWith('.ts'))) {
  const rel = `data/finance/${file}`;
  for (const field of ['summary', 'quickAnswer']) {
    const stat = uniqueRate(rel, field);
    if (stat.total > 20 && stat.rate < 0.8) failures.push(`${rel}: ${field} 고유 비율 낮음 (${stat.unique}/${stat.total})`);
  }
}
const rssText = fs.readFileSync(path.join(ROOT, 'lib/rss/feed.ts'), 'utf8');
if (!rssText.includes('.slice(0, 100)')) failures.push('lib/rss/feed.ts: RSS item 수를 100개 이하로 제한하는 코드가 필요합니다.');
if (failures.length) {
  console.error('콘텐츠 품질 점검 실패');
  for (const item of failures.slice(0, 80)) console.error('-', item);
  if (failures.length > 80) console.error(`...외 ${failures.length - 80}건`);
  process.exit(1);
}
console.log('콘텐츠 품질 점검 통과');
