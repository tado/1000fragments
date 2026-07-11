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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.89 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.15); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	p = fract(p * 2.14) - 0.5;
	p += vec2(-0.50, 0.84) * sin(length(p) * 5.03 - time * 1.87) * 0.22;
	p = rot2(1.88) * p;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.11, vec3(0.52, 0.47, 0.59), vec3(0.33, 0.31, 0.43), vec3(0.71, 1.07, 1.11), vec3(0.50, 0.99, 0.51));
	col = fract(col * 2.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
