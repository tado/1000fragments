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
    vec2 wq = vec2(vnoise2(p * 3.02 + ph), vnoise2(p * 3.02 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.02 + 2.32 * wq + vec2(1.7, 9.2) + t * 0.67),
                   vnoise2(p * 3.02 + 2.36 * wq + vec2(8.3, 2.8) - t * 0.96));
    v = vnoise2(p * 3.02 + 1.29 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.20 * jf)) * 0.89;
        xs += sin(length(p - im) * 216.39 - t * 13.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.46;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.54; kp = rot2(1.02) * kp; kp *= 1.29; }
    v = sin(kp.x * 1.37 - t * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.70, length(q2) * 4.34 - time * 0.65); }
	q3 *= 2.72;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.13, lr * 1.14 + time * 0.53); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d3 = fieldC(q3, time, 1.27);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.80));
	vec3 col = vec3(0.74, 0.96, 0.16) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
