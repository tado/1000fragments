uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.21 * cos(sa * 5.0 + t * 2.41 + ph);
    v = sin((sr - petal) * 19.98);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.23;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.91) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.00) * sin(6.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.48 + ph), vnoise2(p * 2.48 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.48 + 3.50 * wq + vec2(1.7, 9.2) + t * 1.07),
                   vnoise2(p * 2.48 + 1.69 * wq + vec2(8.3, 2.8) - t * 1.02));
    v = vnoise2(p * 2.48 + 2.86 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 12.7) + 0.5) / 12.7;
	q1 = rot2(time * -1.23) * q1;
	q2.x += sin(q2.y * 7.68 + time * 1.35) * 0.37;
	q2 = rot2(2.24) * q2;
	q3 = sin(q3 * 1.91 + time * 1.64) * 1.44;
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.57);
	float d3 = fieldC(q3, time, 1.56);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.28 + time * 0.39, vec3(0.44, 0.42, 0.56), vec3(0.36, 0.31, 0.37), vec3(1.32, 0.74, 0.87), vec3(0.77, 0.10, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
