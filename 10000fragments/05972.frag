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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.74 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.12); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.22 * cos(sa * 3 + t * 0.42 + ph);
    v = sin((sr - petal) * 7.07);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(1.01) * p; }
	p += vec2(0.58, 0.99) * sin(length(p) * 2.95 - time * 1.95) * 0.27;
	p = rot2(length(p) * -3.25 + time * 1.13) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = d1 * d2;
	vec3 col = palette(d * 1.05 + time * 0.05, vec3(0.48, 0.50, 0.59), vec3(0.41, 0.33, 0.36), vec3(1.20, 1.27, 0.89), vec3(0.46, 0.78, 0.67));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
