uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.24 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.59); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.56, t * 1.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	p += vec2(0.50, 0.92) * sin(length(p) * 4.83 - time * 0.69) * 0.26;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.65 + time * 0.04, vec3(0.60, 0.58, 0.50), vec3(0.31, 0.39, 0.43), vec3(1.11, 1.20, 1.34), vec3(0.03, 0.86, 0.69));
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
