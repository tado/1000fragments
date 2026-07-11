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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.34) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.52) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.22 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.16 + ph), vnoise2(p * 4.16 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.16 + 1.16 * wq + vec2(1.7, 9.2) + t * 0.43),
                   vnoise2(p * 4.16 + 3.42 * wq + vec2(8.3, 2.8) - t * 0.58));
    v = vnoise2(p * 4.16 + 3.39 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.21, length(q1) * 3.92 - time * 0.93); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.65, lr * 1.71 + time * -0.36); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.26 / wf * sin(wf * 1.59 * q2.y + time * 1.28); q2.y += 0.39 / wf * cos(wf * 2.70 * q2.x + time * 0.66); }
	q3 = abs(q3) - 0.48;
	q3 = rot2(q3.y * -1.39 + time * 0.40) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d3 = fieldC(q3, time, 1.20);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = vec3(0.79, 0.17, 0.60) * (0.06 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
