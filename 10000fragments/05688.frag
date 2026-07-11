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
    vec2 cq = p * 10.96 + vec2(t * 0.89, -t * 0.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.41 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.99); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	p = rot2(2.88) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.72 * p.y + time * 1.65); p.y += 0.23 / wf * cos(wf * 3.39 * p.x + time * 1.79); }
	{ p = vec2(atan(p.y, p.x) * 2.20, length(p) * 4.24 - time * 0.50); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.13 + time * 0.29, vec3(0.54, 0.58, 0.52), vec3(0.32, 0.33, 0.37), vec3(0.76, 0.84, 0.99), vec3(0.66, 0.00, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
