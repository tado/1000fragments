uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.25; vec2 jc = vec2(0.33 + 0.3 * sin(t * 1.19 + ph), 0.21 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p = fract(p * 2.31) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.15 * p.y + time * 1.37); p.y += 0.46 / wf * cos(wf * 2.95 * p.x + time * 1.21); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 2.31 + time * 0.25); }
	p = rot2(p.y * 1.08 + time * 0.92) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.37));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
