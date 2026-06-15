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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.72 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.31); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.48 + t * 0.64 + ph) + sin(p.y * 12.14 - t * 4.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.44 + time * 0.70) * p;
	p = rot2(time * -1.33) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(2.36) * p; }
	p += vec2(-0.35, 0.53) * sin(length(p) * 3.51 - time * 0.50) * 0.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.50 + time * 0.14, vec3(0.45, 0.51, 0.43), vec3(0.33, 0.47, 0.41), vec3(1.11, 1.28, 0.92), vec3(0.15, 0.63, 0.33));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
