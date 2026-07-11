uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.04 + t * 0.76 + ph) * 0.7;
    float wb = sin(p.y * 7.26 - t * 0.56 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.80;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.06 + t * 2.12 + ph) + sin(p.y * 2.54 - t * 0.93 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.65;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.70 * p.y + time * 1.21); p.y += 0.26 / wf * cos(wf * 3.03 * p.x + time * 0.92); }
	{ float fr = length(p); p *= 1.0 + 0.57 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 2.41 + time * -0.39); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.06);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.41 + time * 0.17, vec3(0.42, 0.54, 0.54), vec3(0.34, 0.30, 0.33), vec3(1.05, 0.88, 1.13), vec3(0.06, 0.18, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
