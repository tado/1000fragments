uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.03 * sin(mf + 3.0) + ph), cos(t * 2.03 * cos(mf + 3.0) + ph));
        ms += 0.096 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.25 * p.y + time * 0.96); p.y += 0.43 / wf * cos(wf * 1.83 * p.x + time * 1.96); }
	p = rot2(length(p) * 3.12 + time * 0.31) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.72, lr * 2.26 + time * 0.14); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.25, vec3(0.58, 0.43, 0.57), vec3(0.43, 0.32, 0.46), vec3(1.15, 0.95, 0.88), vec3(0.45, 0.86, 0.92));
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
