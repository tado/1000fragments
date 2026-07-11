uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.00; vec2 jc = vec2(0.10 + 0.3 * sin(t * 0.60 + ph), 0.42 + 0.3 * cos(t * 0.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.83, lr * 2.89 + time * 0.87); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.18; p = rot2(1.68) * p; }
	p = rot2(p.y * 1.45 + time * 1.05) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.92 * p.y + time * 1.97); p.y += 0.45 / wf * cos(wf * 2.55 * p.x + time * 1.63); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.00, 0.46), vec3(0.88, 0.56, 0.92), d);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
