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
    vec2 kp = p * 2.12;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.75; kp = rot2(2.30) * kp; kp *= 1.31; }
    v = sin(kp.x * 1.20 - t * 1.64 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.32 * vnoise2(p * 2.86 + t * 1.19);
    v = sin(wr * 13.19 - t * 2.45 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 6.43 + time * 1.69) * 0.31;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.07, lr * 2.44 + time * -0.35); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.10);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.96, 0.20, 0.78) * (0.24 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 0.89 + time * 12.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
