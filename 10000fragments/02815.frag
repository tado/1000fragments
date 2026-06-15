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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.66 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.28); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 38.85 - t * 5.32 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 35.78 - t * 5.32 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 3.42 + time * 0.39) * p;
	p = rot2(time * -0.37) * p;
	p += vec2(-0.99, 0.37) * sin(length(p) * 3.96 - time * 0.79) * 0.32;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.53 * p.y + time * 0.76); p.y += 0.29 / wf * cos(wf * 3.74 * p.x + time * 1.83); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.58 + time * 0.08, vec3(0.58, 0.41, 0.50), vec3(0.46, 0.38, 0.35), vec3(0.83, 0.83, 1.18), vec3(0.45, 0.17, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
