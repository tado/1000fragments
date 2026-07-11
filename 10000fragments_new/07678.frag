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
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.68 + sr * 23.16 - t * 4.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.97;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.00) * kp; kp *= 1.20; }
    v = sin(kp.x * 3.52 - t * 2.09 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.86) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.44 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.89, lr * 1.35 + time * 0.38); }
	{ float fr = length(q3); q3 *= 1.0 + -0.51 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d3 = fieldC(q3, time, 0.95);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.72 + time * 0.22, vec3(0.42, 0.53, 0.42), vec3(0.42, 0.44, 0.32), vec3(0.92, 0.77, 1.24), vec3(0.08, 0.55, 0.65));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
