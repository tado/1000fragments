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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.04 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.17); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.08 + vec2(t * 0.95, -t * 0.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	p = rot2(p.y * -1.38 + time * 1.00) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.93, 0.11) * sin(length(p) * 3.22 - time * 1.64) * 0.27;
	p = rot2(length(p) * 1.10 + time * 0.76) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.40 + time * 0.05, vec3(0.55, 0.47, 0.58), vec3(0.31, 0.46, 0.43), vec3(0.76, 0.71, 1.10), vec3(0.95, 0.59, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
