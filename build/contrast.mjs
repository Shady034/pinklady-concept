// WCAG AA check over every foreground/background pair the design actually uses.
const hex=(h)=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16));};
const lin=(c)=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4;};
const L=(h)=>{const [r,g,b]=hex(h).map(lin);return 0.2126*r+0.7152*g+0.0722*b;};
const ratio=(a,b)=>{const l1=L(a),l2=L(b);const [hi,lo]=l1>l2?[l1,l2]:[l2,l1];return (hi+0.05)/(lo+0.05);};

const INK='#180810', BONE='#fdf8f5', PINK='#d4145a', PINKLIT='#ff5c96', MUTED='#6d5560';
const pairs=[
  ['body text on bone', INK, BONE],
  ['muted on bone', MUTED, BONE],
  ['muted on bone-2', MUTED, '#f7ebe6'],
  ['muted on blush', MUTED, '#fde3ea'],
  ['muted on rose', MUTED, '#f6d3de'],
  ['card category label (pink on bone)', PINK, BONE],
  ['pink-ink on blush', '#a30e47', '#fde3ea'],
  ['pink-ink on rose tile', '#a30e47', '#f0bccf'],
  ['pink-ink on sage tile', '#a30e47', '#d3e2d1'],
  ['pink-ink on amber tile', '#a30e47', '#f6d6b9'],
  ['pink-ink on plum tile', '#a30e47', '#dcc2da'],
  ['bone-4 on bone', '#7a6460', BONE],
  ['bone on ink', BONE, INK],
  ['muted-on-ink', '#c6a6b4', INK],
  ['hero lede on ink', '#e3cad3', INK],
  ['hero stat label on ink', '#c6a6b4', INK],
  ['pink-lit on ink', PINKLIT, INK],
  ['footer link on ink', '#dcc0cc', INK],
  ['footer fine print on ink', '#a8899a', INK],
  ['white on CTA gradient (light end)', '#ffffff', '#e01a63'],
  ['white on CTA gradient (dark end)', '#ffffff', '#b81050'],
  ['ribbon text (white on CTA gradient)', '#ffffff', '#e01a63'],
  ['warn note', '#6b4600', '#fdf0dd'],
];
let fails=0;
for(const [name,fg,bg] of pairs){
  const r=ratio(fg,bg);
  const tag = r>=4.5 ? 'AA' : r>=3 ? 'AA-large-only' : 'FAIL';
  if(r<4.5) fails++;
  console.log(tag.padEnd(14), r.toFixed(2).padStart(5), ' ', name);
}
console.log('\npairs below AA (4.5):', fails);
if (fails) process.exitCode = 1;
