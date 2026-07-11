uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.03; vec2 jc = vec2(0.01 + 0.3 * sin(t * 0.62 + ph), -0.55 + 0.3 * cos(t * 0.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.71 * p.y + time * 0.91); p.y += 0.31 / wf * cos(wf * 3.25 * p.x + time * 1.26); }
	p = rot2(time * 0.32) * p;
	p = (floor(p * 14.9) + 0.5) / 14.9;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.03, lr * 1.59 + time * 0.57); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
