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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.74 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.01); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.90 + sin(p.y * 4.37 + t * 4.76) * 3.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	{ p = vec2(atan(p.y, p.x) * 2.56, length(p) * 4.60 - time * 0.27); }
	p = rot2(time * 0.41) * p;
	p = abs(p);
	p = rot2(0.78) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.65 + time * 0.22, vec3(0.50, 0.41, 0.51), vec3(0.34, 0.45, 0.44), vec3(1.20, 1.09, 1.00), vec3(0.39, 0.56, 0.23));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
