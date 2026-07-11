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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.74 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.41); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	p = rot2(time * 0.49) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.25, vec3(0.43, 0.58, 0.54), vec3(0.30, 0.42, 0.39), vec3(0.98, 0.83, 0.75), vec3(0.36, 0.46, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
