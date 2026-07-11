uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.84; vec2 jc = vec2(0.27 + 0.3 * sin(t * 1.21 + ph), -0.08 + 0.3 * cos(t * 1.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.56 * p.y + time * 1.68); p.y += 0.33 / wf * cos(wf * 3.94 * p.x + time * 0.90); }
	p = abs(p) - 0.64;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.37));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
