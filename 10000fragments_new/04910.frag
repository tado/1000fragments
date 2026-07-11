uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 31.73 - t * 7.52 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 21.33 - t * 1.17 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.49;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.72; kp = rot2(0.40) * kp; kp *= 1.29; }
    v = sin(kp.y * 3.77 - t * 2.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.63, lr * 1.24 + time * -0.59); }
	q2 = rot2(q2.y * -1.04 + time * 0.95) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.96));
	vec3 col = palette(d * 0.93 + time * 0.39, vec3(0.50, 0.46, 0.51), vec3(0.32, 0.50, 0.34), vec3(1.18, 0.77, 1.17), vec3(0.22, 0.99, 0.97));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
