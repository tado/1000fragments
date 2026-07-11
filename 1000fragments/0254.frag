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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.91 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.51); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p *= 2.40;
	p = fract(p * 2.41) - 0.5;
	p = rot2(0.98) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.11, vec3(0.40, 0.49, 0.48), vec3(0.35, 0.40, 0.50), vec3(1.10, 0.72, 1.15), vec3(0.73, 0.92, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
