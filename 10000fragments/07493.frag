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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.27 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.22); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.20 + t * 2.34 + ph) + sin(p.y * 3.83 - t * 2.34 + ph)
        + sin((p.x + p.y) * 7.46 + t * 2.34 + ph) + sin(length(p) * 4.22 - t * 2.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.73 * p.y + time * 1.92); p.y += 0.30 / wf * cos(wf * 2.81 * p.x + time * 1.41); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(0.82) * p;
	p = rot2(length(p) * 2.67 + time * 0.76) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.15, vec3(0.47, 0.46, 0.45), vec3(0.42, 0.42, 0.35), vec3(1.34, 0.82, 0.90), vec3(0.48, 0.64, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
