uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.88 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.32); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.92 + vec2(t * 2.82, -t * 2.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	p = rot2(time * -0.81) * p;
	p += vec2(-0.26, -0.65) * sin(length(p) * 5.18 - time * 1.30) * 0.28;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.69 * p.y + time * 1.99); p.y += 0.38 / wf * cos(wf * 2.29 * p.x + time * 1.81); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.23, vec3(0.41, 0.57, 0.44), vec3(0.37, 0.45, 0.42), vec3(1.06, 1.16, 1.03), vec3(0.11, 0.70, 0.25));
	col = fract(col * 2.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
