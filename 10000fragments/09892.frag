uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(0.24 + 0.3 * sin(t * 0.64 + ph), 0.37 + 0.3 * cos(t * 0.64 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	p *= 2.81;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.61 * p.y + time * 1.72); p.y += 0.24 / wf * cos(wf * 3.28 * p.x + time * 1.95); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.04, lr * 2.34 + time * 0.21); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.74));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
