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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.40 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.22); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.47);
    float gsh = hash21(vec2(grow, floor(t * 7.03))) - 0.5;
    float gx = p.x + gsh * 0.66;
    v = sin(gx * 12.87 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.51));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.86) * p;
	p = rot2(length(p) * 2.91 + time * 0.33) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.33 + time * 0.68); }
	p = rot2(time * 0.48) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.38);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.11 + time * 0.29, vec3(0.50, 0.43, 0.59), vec3(0.38, 0.32, 0.33), vec3(1.38, 0.86, 0.97), vec3(0.70, 0.37, 0.03));
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
