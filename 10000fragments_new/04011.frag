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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.34 * sin(t * 0.60) + t * 1.13 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.18 + ph), vnoise2(p * 2.18 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.18 + 3.73 * wq + vec2(1.7, 9.2) + t * 0.49),
                   vnoise2(p * 2.18 + 3.60 * wq + vec2(8.3, 2.8) - t * 0.48));
    v = vnoise2(p * 2.18 + 2.85 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.16, t * 0.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.77) - 0.5;
	q2.y += sin(q2.x * 7.74 + time * 3.87) * 0.19;
	q3 *= 2.80;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d3 = fieldC(q3, time, 1.29);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.00 + time * 0.16, vec3(0.59, 0.55, 0.43), vec3(0.46, 0.36, 0.39), vec3(0.72, 0.76, 0.79), vec3(0.55, 0.23, 0.19));
	col = fract(col * 1.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
