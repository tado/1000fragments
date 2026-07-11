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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.17) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.15 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.19 * vnoise2(p * 4.93 + t * 1.26);
    v = sin(wr * 29.67 - t * 3.49 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.73 - t * 1.14;
    v = sin(floor(lv * 5.4) / 5.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.33, lr * 2.74 + (time * 0.51) * 0.21); }
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.56; }
	q3 = (floor(q3 * 9.0) + 0.5) / 9.0;
	float d1 = fieldA(q1, (time * 0.51), 0.0);
	float d2 = fieldB(q2, (time * 0.51), 0.70);
	float d3 = fieldC(q3, (time * 0.51), 1.28);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.51, 0.48, 0.52) + vec3(0.02, 0.06, 0.06);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.966, 1.023) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
