uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.12; vec2 jc = vec2(-0.24 + 0.3 * sin(t * 0.21 + ph), 0.30 + 0.3 * cos(t * 0.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.85 * p.y + time * 1.16); p.y += 0.22 / wf * cos(wf * 2.80 * p.x + time * 1.83); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.31, lr * 1.61 + time * -0.16); }
	{ p = vec2(atan(p.y, p.x) * 1.96, length(p) * 2.99 - time * 0.30); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.19; p = rot2(2.57) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.77 + time * 0.03);
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
