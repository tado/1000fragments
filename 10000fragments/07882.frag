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
    vec2 cq = p * 8.73 + vec2(t * 0.64, -t * 0.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.21 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.10); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p += vec2(0.64, -0.65) * sin(length(p) * 5.06 - time * 1.98) * 0.21;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.70, length(p) * 4.11 - time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = d1 + d2;
	vec3 col = palette(d * 1.08 + time * 0.19, vec3(0.54, 0.48, 0.58), vec3(0.43, 0.47, 0.50), vec3(1.29, 1.32, 1.35), vec3(0.03, 0.77, 0.58));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
