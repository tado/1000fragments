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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.43 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.14); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.60 + sin(p.y * 4.00 + t * 3.35) * 3.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	p = rot2(p.y * 1.72 + time * 0.53) * p;
	p = abs(p) - 0.38;
	p = rot2(time * -0.94) * p;
	p = rot2(0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.84);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.91 + time * 0.08, vec3(0.58, 0.55, 0.50), vec3(0.43, 0.39, 0.48), vec3(1.24, 1.09, 1.31), vec3(0.51, 0.08, 0.99));
	col = mod(col * 2.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
