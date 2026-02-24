const fs = require('fs');
const path = require('path');
const dir = '100fragments';
let out = '';
for(let i=0; i<100; i++) {
    let filename = String(i).padStart(2, '0') + '.frag';
    let filepath = path.join(dir, filename);
    if(fs.existsSync(filepath)) {
        out += `
--- ${filename} ---
`;
        out += fs.readFileSync(filepath, 'utf8');
    }
}
fs.writeFileSync('all_100.txt', out);
