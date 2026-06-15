uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.96 + t * 1.93 + ph) + sin(p.y * 13.50 - t * 1.13 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	p = rot2(p.y * 1.53 + time * 0.81) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.03, lr * 2.12 + time * 0.25); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.74 * p.y + time * 1.15); p.y += 0.34 / wf * cos(wf * 2.45 * p.x + time * 0.87); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.18, vec3(0.42, 0.47, 0.55), vec3(0.31, 0.44, 0.40), vec3(1.07, 1.19, 1.00), vec3(0.34, 0.21, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
