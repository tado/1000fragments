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
    v = sin(sa * 2.71 + sr * 5.93 - t * 3.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.94 + vec2(t * 2.93, -t * 2.93) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.28;
	p = rot2(length(p) * -3.81 + time * 0.82) * p;
	p = abs(p);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.69 * p.y + time * 0.66); p.y += 0.21 / wf * cos(wf * 3.73 * p.x + time * 1.85); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = d1 * d2;
	vec3 col = palette(d * 1.45 + time * 0.03, vec3(0.43, 0.56, 0.47), vec3(0.45, 0.32, 0.35), vec3(0.80, 1.35, 1.03), vec3(0.45, 0.38, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
