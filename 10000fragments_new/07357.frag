uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.90 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.26 + t * 1.25 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p.y += sin(p.x * 7.03 + time * 3.59) * 0.30;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.38, lr * 1.63 + time * 0.90); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.00 * p.y + time * 2.20); p.y += 0.30 / wf * cos(wf * 1.74 * p.x + time * 1.95); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.24, vec3(0.55, 0.59, 0.43), vec3(0.45, 0.43, 0.50), vec3(1.40, 0.98, 0.84), vec3(0.01, 0.16, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
