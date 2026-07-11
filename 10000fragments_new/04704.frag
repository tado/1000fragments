uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.43;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.65; kp = rot2(1.92) * kp; kp *= 1.34; }
    v = sin(kp.x * 3.93 - t * 4.98 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.00 + sr * 18.11 - t * 4.91 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.02, t * 0.51 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.36;
	{ float fr = length(q1); q1 *= 1.0 + -0.56 * fr * fr; }
	q2 = fract(q2 * 2.23) - 0.5;
	q3 = rot2(q3.y * -3.08 + time * 1.16) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d3 = fieldC(q3, time, 0.88);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.61));
	vec3 col = palette(d * 0.83 + time * 0.15, vec3(0.54, 0.47, 0.53), vec3(0.34, 0.37, 0.47), vec3(0.71, 1.35, 0.98), vec3(0.65, 0.52, 0.43));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.88 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
