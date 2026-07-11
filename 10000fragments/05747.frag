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
    v = 0.25 * (sin(p.x * 4.81 + t * 3.66 + ph) + sin(p.y * 7.55 - t * 3.66 + ph)
        + sin((p.x + p.y) * 6.23 + t * 3.66 + ph) + sin(length(p) * 8.01 - t * 3.66 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.89 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.12); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	p = abs(p) - 0.53;
	p = rot2(p.y * -1.16 + time * 0.32) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.44; p = rot2(1.77) * p; }
	p *= 1.44;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 * d2;
	vec3 col = palette(d * 1.48 + time * 0.21, vec3(0.40, 0.50, 0.49), vec3(0.42, 0.42, 0.38), vec3(0.74, 0.74, 1.05), vec3(0.63, 0.99, 0.38));
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
