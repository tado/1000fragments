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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.04 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.63); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 35.66 - t * 4.50 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 32.86 - t * 4.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 3.23 - time * 0.10); }
	p = fract(p * 2.89) - 0.5;
	p = rot2(length(p) * -3.38 + time * 0.89) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = d1 * d2;
	vec3 col = palette(d * 1.10 + time * 0.23, vec3(0.43, 0.48, 0.40), vec3(0.44, 0.38, 0.36), vec3(1.02, 0.79, 0.73), vec3(0.37, 0.72, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
