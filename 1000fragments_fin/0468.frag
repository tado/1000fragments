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
    vec2 kp = p * 1.72;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.62; kp = rot2(2.48) * kp; kp *= 1.29; }
    v = sin(kp.y * 1.35 - t * 4.03 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.14 * vnoise2(p * 5.77 + t * 1.18);
    v = sin(wr * 11.28 - t * 2.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.36, lr * 1.50 + (time * 0.80) * 0.82); }
	float d1 = fieldA(q1, (time * 0.80), 0.0);
	float d2 = fieldB(q2, (time * 0.80), 0.72);
	float d = d1 * d2;
	vec3 col = vec3(0.925, 0.480, 0.459) * (0.05 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	col *= 0.86 + 0.16 * sin(gl_FragCoord.y * 1.01 + (time * 0.80) * 17.24);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.995, 1.000, 1.008);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
