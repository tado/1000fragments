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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.69 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.61); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.83 + t * 4.66 + ph) + sin(p.y * 11.45 - t * 4.66 + ph)
        + sin((p.x + p.y) * 11.21 + t * 4.66 + ph) + sin(length(p) * 4.38 - t * 4.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	p *= 2.47;
	p = rot2(p.y * -1.73 + time * 0.39) * p;
	p = fract(p * 1.73) - 0.5;
	p = rot2(length(p) * 2.40 + time * 0.71) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.27, vec3(0.53, 0.46, 0.50), vec3(0.32, 0.33, 0.49), vec3(0.73, 1.27, 1.17), vec3(0.31, 0.63, 0.27));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
