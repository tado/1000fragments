uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.27);
    float gsh = hash21(vec2(grow, floor(t * 5.46))) - 0.5;
    float gx = p.x + gsh * 0.59;
    v = sin(gx * 14.79 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.32));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.93, t * 2.21 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.98 + sr * 15.95 - t * 3.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.79;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.17; q1 = rot2(2.00) * q1; }
	q3 *= 2.06;
	{ float fr = length(q3); q3 *= 1.0 + 0.21 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.26);
	float d3 = fieldC(q3, time, 1.57);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = palette(d * 0.89 + time * 0.11, vec3(0.56, 0.42, 0.45), vec3(0.43, 0.31, 0.31), vec3(1.00, 1.29, 1.31), vec3(0.14, 0.10, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
