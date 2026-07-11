uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.66 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.83); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.47, lr * 1.33 + time * -0.87); }
	{ p = vec2(atan(p.y, p.x) * 1.39, length(p) * 5.99 - time * 0.82); }
	p = rot2(p.y * 2.98 + time * 0.77) * p;
	p = fract(p * 1.89) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.20, vec3(0.43, 0.58, 0.52), vec3(0.47, 0.39, 0.48), vec3(0.79, 1.12, 1.21), vec3(0.73, 0.85, 0.42));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
