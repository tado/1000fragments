const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { execSync } = require('child_process');

const url = "https://github.com/KhronosGroup/glslang/releases/download/master-tot/glslang-master-windows-x64-Release.zip";
const zipPath = "glslang.zip";
const extractDir = "glslang_bin";

function testShaders() {
    const validator = path.join(extractDir, "bin", "glslangValidator.exe");
    if (!fs.existsSync(validator)) {
        console.error("Error: Could not find " + validator);
        return;
    }

    const shaderDir = "1000fragments-gemini";
    const files = fs.readdirSync(shaderDir).filter(f => f.endsWith(".frag"));
    
    let errors = 0;
    console.log("Testing " + files.length + " shaders...");
    
    for (const f of files) {
        const filepath = path.join(shaderDir, f);
        const content = fs.readFileSync(filepath, 'utf8');
        
        // Setup TDOutputSwizzle macro and a basic version header to satisfy the compiler
        const testContent = "#version 330\n#define TDOutputSwizzle(x) x\n" + content;
        const testFile = "temp_test.frag";
        
        fs.writeFileSync(testFile, testContent);
        
        try {
            execSync('"' + validator + '" "' + testFile + '"', { stdio: 'pipe' });
        } catch (error) {
            console.error("Error in " + f + ":");
            console.error(error.stdout ? error.stdout.toString() : error.message);
            errors++;
            if (errors > 5) {
                console.error("Too many errors. Stopping.");
                break;
            }
        }
    }
            
    if (fs.existsSync("temp_test.frag")) {
        fs.unlinkSync("temp_test.frag");
    }
        
    console.log("Finished testing. Found " + errors + " failing shaders.");
}

testShaders();
