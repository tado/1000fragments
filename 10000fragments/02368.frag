uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.24 * cos(sa * 5 + t * 1.71 + ph);
    v = sin((sr - petal) * 12.98);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.84 + vec2(t * 0.37, -t * 0.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.40 * p.y + time * 1.99); p.y += 0.43 / wf * cos(wf * 2.50 * p.x + time * 0.85); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.26; p = rot2(1.35) * p; }
	p *= 3.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.81 + time * 0.06, vec3(0.48, 0.58, 0.46), vec3(0.33, 0.37, 0.34), vec3(1.08, 1.33, 1.12), vec3(0.51, 0.35, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
