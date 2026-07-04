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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.70 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.28); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.50 + sin(p.y * 5.29 + t * 3.37) * 2.57 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.05 + ph), vnoise2(p * 4.05 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.05 + 3.48 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 4.05 + 3.35 * wq + vec2(8.3, 2.8) - t * 1.14));
    v = vnoise2(p * 4.05 + 3.48 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.40, lr * 2.10 + time * 0.33); }
	q1 = sin(q1 * 2.54 + time * 1.88) * 0.80;
	q2 = rot2(time * -1.41) * q2;
	q3 = rot2(q3.y * -1.57 + time * 0.37) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d3 = fieldC(q3, time, 0.62);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = vec3(0.52, 0.79, 0.18) * (0.17 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
