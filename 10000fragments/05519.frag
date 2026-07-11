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
    float ma = sin(length(p - vec2(0.27, 0.0)) * 18.90 - t * 4.51 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 18.39 - t * 4.51 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.10 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.27); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	{ p = vec2(atan(p.y, p.x) * 1.22, length(p) * 5.85 - time * 0.78); }
	p = rot2(1.77) * p;
	p = rot2(p.y * -3.79 + time * 0.53) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.73 + time * 0.21, vec3(0.47, 0.42, 0.50), vec3(0.35, 0.38, 0.45), vec3(1.21, 0.94, 0.83), vec3(0.81, 0.02, 0.36));
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
