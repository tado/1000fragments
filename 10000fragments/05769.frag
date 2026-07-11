uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    float ma = sin(length(p - vec2(0.24, 0.0)) * 29.94 - t * 3.12 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 22.91 - t * 3.12 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.04 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.34); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.54 * p.y + time * 1.75); p.y += 0.29 / wf * cos(wf * 3.05 * p.x + time * 0.94); }
	p += vec2(0.35, -0.98) * sin(length(p) * 2.00 - time * 1.68) * 0.11;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.80 + time * 0.03, vec3(0.49, 0.56, 0.57), vec3(0.39, 0.34, 0.34), vec3(0.80, 1.04, 1.02), vec3(0.26, 0.94, 0.11));
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
