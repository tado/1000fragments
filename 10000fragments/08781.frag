uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.68, t * 2.06 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.94 * sin(mf + 3.0) + ph), cos(t * 1.94 * cos(mf + 3.0) + ph));
        ms += 0.071 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 2.30 + time * 0.13); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.41; p = rot2(2.55) * p; }
	p = rot2(p.y * -1.72 + time * 0.96) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.05 * p.y + time * 1.90); p.y += 0.33 / wf * cos(wf * 3.15 * p.x + time * 0.83); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = d1 * d2;
	vec3 col = palette(d * 1.63 + time * 0.20, vec3(0.48, 0.59, 0.44), vec3(0.43, 0.49, 0.42), vec3(1.38, 0.84, 0.78), vec3(0.18, 0.79, 0.09));
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
