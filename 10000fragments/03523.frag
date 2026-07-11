uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.91 + vec2(t * 1.10, -t * 1.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.39) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.24 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.13, lr * 2.83 + time * -0.78); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.17 * p.y + time * 0.61); p.y += 0.25 / wf * cos(wf * 2.99 * p.x + time * 1.25); }
	{ p = vec2(atan(p.y, p.x) * 2.35, length(p) * 4.84 - time * 0.55); }
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.93);
	float d = d1 * d2;
	vec3 col = palette(d * 0.68 + time * 0.26, vec3(0.55, 0.54, 0.53), vec3(0.40, 0.35, 0.45), vec3(1.31, 1.32, 1.08), vec3(0.84, 0.47, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
