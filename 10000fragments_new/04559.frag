uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.65;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.34 - t * 4.69 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.58 - t * 7.01 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.97) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.95 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 2.95 + time * 0.65) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.77, length(q1) * 2.20 - time * 0.43); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.32, lr * 1.09 + time * -0.75); }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d3 = fieldC(q3, time, 0.13);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.21 + time * 0.34, vec3(0.43, 0.41, 0.55), vec3(0.40, 0.38, 0.38), vec3(0.78, 1.08, 1.15), vec3(0.41, 0.18, 0.61));
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 2.98 + time * 12.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
