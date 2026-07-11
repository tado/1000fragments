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
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.96 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.64) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 34.14 - t * 4.92 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 25.25 - t * 7.61 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.21 + ph), vnoise2(p * 2.21 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.21 + 2.70 * wq + vec2(1.7, 9.2) + t * 0.32),
                   vnoise2(p * 2.21 + 3.90 * wq + vec2(8.3, 2.8) - t * 1.00));
    v = vnoise2(p * 2.21 + 1.33 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.30, 0.82) * sin(length(q1) * 2.27 - time * 1.18) * 0.37;
	q1 = abs(q1);
	{ q2 = vec2(atan(q2.y, q2.x) * 2.96, length(q2) * 2.31 - time * 0.21); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.98, lr * 1.61 + time * -0.86); }
	q3 += vec2(0.55, -0.60) * sin(length(q3) * 3.35 - time * 2.44) * 0.23;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d3 = fieldC(q3, time, 0.35);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.37));
	vec3 col = vec3(0.62, 0.19, 0.65) * (0.17 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
