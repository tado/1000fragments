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
    v = 0.5 * (sin(p.x * 13.72 + t * 5.15 + ph) + sin(p.y * 12.36 - t * 1.09 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.65 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.39); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 3.87 - time * 0.39); }
	p = rot2(p.y * -2.27 + time * 0.71) * p;
	p += vec2(-0.18, -0.15) * sin(length(p) * 5.65 - time * 1.49) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.17 + time * 0.10, vec3(0.52, 0.55, 0.48), vec3(0.42, 0.38, 0.46), vec3(1.07, 1.18, 0.93), vec3(0.15, 0.67, 0.94));
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
