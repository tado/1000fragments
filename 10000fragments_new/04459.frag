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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.14 + ph), vnoise2(p * 2.14 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.14 + 2.72 * wq + vec2(1.7, 9.2) + t * 0.36),
                   vnoise2(p * 2.14 + 3.16 * wq + vec2(8.3, 2.8) - t * 0.84));
    v = vnoise2(p * 2.14 + 3.32 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.33 + t * 3.00 + ph) + sin(p.y * 17.54 - t * 0.70 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.66 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.10 + t * 2.35 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.32, lr * 2.06 + time * -0.22); }
	{ float fr = length(q1); q1 *= 1.0 + -0.75 * fr * fr; }
	q2 += vec2(0.25, -0.79) * sin(length(q2) * 2.11 - time * 2.25) * 0.26;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.02);
	float d3 = fieldC(q3, time, 0.84);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.43 + time * 0.08, vec3(0.45, 0.54, 0.47), vec3(0.49, 0.34, 0.46), vec3(1.17, 1.35, 0.74), vec3(0.66, 0.36, 0.60));
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
