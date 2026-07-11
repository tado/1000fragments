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
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.26 * pow(abs(cos(ra * 3.0 + t * 2.09)), 1.63);
    v = sin((rr - pet) * 14.30 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.04 + ph), vnoise2(p * 3.04 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.04 + 1.53 * wq + vec2(1.7, 9.2) + t * 0.93),
                   vnoise2(p * 3.04 + 1.93 * wq + vec2(8.3, 2.8) - t * 1.10));
    v = vnoise2(p * 3.04 + 3.19 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.36;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.17 - t * 3.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.57, length(q1) * 5.67 - time * 0.81); }
	q3 = fract(q3 * 2.43) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.27);
	float d3 = fieldC(q3, time, 0.77);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.82 + time * 0.13, vec3(0.55, 0.48, 0.56), vec3(0.46, 0.44, 0.45), vec3(0.98, 0.87, 0.88), vec3(0.45, 0.38, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
