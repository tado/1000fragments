uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
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
    float wa = sin(p.x * 8.04 + t * 0.70 + ph) * 0.7;
    float wb = sin(p.y * 5.31 - t * 0.70 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.52;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.61 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.49); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	p += vec2(-0.88, -0.22) * sin(length(p) * 4.36 - time * 1.36) * 0.28;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.25, lr * 1.63 + time * 1.00); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = d1 + d2;
	vec3 col = palette(d * 0.98 + time * 0.25, vec3(0.56, 0.55, 0.49), vec3(0.43, 0.38, 0.34), vec3(1.21, 1.13, 1.39), vec3(0.34, 0.60, 0.51));
	col *= 0.89 + 0.12 * sin(gl_FragCoord.y * 1.23 + time * 6.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
