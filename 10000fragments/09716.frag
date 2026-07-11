uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.54; vec2 jc = vec2(0.04 + 0.3 * sin(t * 0.45 + ph), 0.33 + 0.3 * cos(t * 0.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.05 * p.y + time * 1.40); p.y += 0.48 / wf * cos(wf * 3.40 * p.x + time * 1.41); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.17; p = rot2(2.03) * p; }
	p = abs(p) - 0.32;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.26, lr * 2.90 + time * -0.53); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.21, 0.55), vec3(0.75, 0.98, 0.47), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
