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
    v = 0.5 * (sin(p.x * 15.94 + t * 1.59 + ph) + sin(p.y * 5.27 - t * 3.43 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.96 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.45); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	p = rot2(length(p) * 2.47 + time * 0.66) * p;
	p += vec2(0.14, 0.34) * sin(length(p) * 4.63 - time * 0.56) * 0.39;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = d1 * d2;
	vec3 col = palette(d * 1.80 + time * 0.19, vec3(0.48, 0.55, 0.51), vec3(0.34, 0.38, 0.41), vec3(0.86, 0.77, 1.14), vec3(0.02, 0.15, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
