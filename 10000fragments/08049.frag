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
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.97 + sr * 15.92 - t * 0.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.86 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.06); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.27) * p;
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 2.64 - time * 0.73); }
	p = rot2(p.y * 2.11 + time * 0.44) * p;
	p *= 2.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = d1 + d2;
	vec3 col = palette(d * 1.28 + time * 0.16, vec3(0.55, 0.44, 0.43), vec3(0.49, 0.44, 0.43), vec3(1.01, 1.18, 0.79), vec3(0.27, 0.14, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
