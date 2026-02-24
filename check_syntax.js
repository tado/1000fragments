const fs = require('fs');
const path = require('path');
const dir = '1000fragments-gemini';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.frag'));

let errors = [];

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Split by actual newline characters instead of using \n literal in string
    let lines = content.split('\n');
    let inMain = false;
    let mainLines = [];
    for(let line of lines) {
        if (line.includes('void main() {')) inMain = true;
        if (inMain) mainLines.push(line.trim());
    }
    
    let mainStr = mainLines.join(' ');
    
    // Count parens safely
    let openCount = 0;
    let closeCount = 0;
    for(let i=0; i<mainStr.length; i++) {
        if (mainStr[i] === '(') openCount++;
        if (mainStr[i] === ')') closeCount++;
    }
    
    if (openCount !== closeCount) {
        errors.push(f + ': unbalanced parentheses (' + openCount + ' vs ' + closeCount + ')');
    }
    
    if (mainStr.includes(', )')) errors.push(f + ': trailing comma in function call');
});

console.log('Analyzed ' + files.length + ' files. Found ' + errors.length + ' basic syntax issues.');
if (errors.length > 0) {
    console.log(errors.slice(0, 20).join('\n'));
}
