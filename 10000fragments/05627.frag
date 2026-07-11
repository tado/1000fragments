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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.84 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.67); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 15.35 - t * 6.67 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 11.28 - t * 6.67 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	p = rot2(length(p) * -1.01 + time * 0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.20, vec3(0.44, 0.48, 0.51), vec3(0.41, 0.35, 0.36), vec3(0.96, 1.34, 1.25), vec3(0.71, 0.78, 0.96));
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
