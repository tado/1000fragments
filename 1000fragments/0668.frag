uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.54 + vec2(t * 1.94, -t * 1.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.21 + t * 4.79 + ph) + sin(p.y * 7.79 - t * 5.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	p = rot2(2.66) * p;
	p = abs(p) - 0.32;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.97 * p.y + time * 1.18); p.y += 0.23 / wf * cos(wf * 2.44 * p.x + time * 0.62); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.06, vec3(0.45, 0.46, 0.52), vec3(0.41, 0.37, 0.34), vec3(1.23, 0.75, 0.93), vec3(0.47, 0.03, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
