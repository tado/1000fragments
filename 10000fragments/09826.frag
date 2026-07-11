uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(0.25 + 0.3 * sin(t * 1.11 + ph), -0.62 + 0.3 * cos(t * 1.11 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	p = rot2(time * -0.48) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.24 + time * -0.39); }
	p = rot2(p.y * 1.52 + time * 0.33) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.44 * p.y + time * 0.90); p.y += 0.37 / wf * cos(wf * 3.11 * p.x + time * 1.71); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.40, 0.37), vec3(0.94, 0.74, 0.59), d);
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
