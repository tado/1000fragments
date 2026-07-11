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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.53 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.10); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.38 - t * 7.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 4.58 + time * 1.17) * 0.27;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.07 * p.y + time * 1.69); p.y += 0.39 / wf * cos(wf * 2.11 * p.x + time * 1.95); }
	p += vec2(0.21, 0.55) * sin(length(p) * 2.91 - time * 1.16) * 0.15;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.32; p = rot2(2.54) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.99 + time * 0.27, vec3(0.57, 0.41, 0.58), vec3(0.35, 0.47, 0.33), vec3(1.21, 0.99, 1.13), vec3(0.92, 0.67, 0.20));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
