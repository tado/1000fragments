uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.91 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.56); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.90 * p.y + time * 1.12); p.y += 0.26 / wf * cos(wf * 2.18 * p.x + time * 2.13); }
	p = rot2(2.75) * p;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	p = abs(p) - 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.27, vec3(0.48, 0.43, 0.45), vec3(0.49, 0.45, 0.36), vec3(1.22, 1.18, 1.11), vec3(0.47, 0.97, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
