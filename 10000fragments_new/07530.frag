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
    vec3 g = vec3(p * 9.36, t * 2.19 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.16);
    float gsh = hash21(vec2(grow, floor(t * 5.97))) - 0.5;
    float gx = p.x + gsh * 1.01;
    v = sin(gx * 7.94 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.83));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.95, lr * 2.11 + time * 0.27); }
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.17; q2 = rot2(2.37) * q2; }
	q2 = rot2(time * -1.29) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.93 + time * 0.27, vec3(0.49, 0.49, 0.44), vec3(0.30, 0.38, 0.39), vec3(0.91, 0.92, 0.78), vec3(0.15, 0.57, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
