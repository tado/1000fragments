uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.30 * cos(sa * 3.0 + t * 1.33 + ph);
    v = sin((sr - petal) * 14.06);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 18.59 - t * 4.14 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 17.29 - t * 3.17 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.14, lr * 2.07 + time * -0.98); }
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.17; q2 = rot2(1.06) * q2; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.24 / wf * sin(wf * 1.89 * q2.y + time * 1.48); q2.y += 0.34 / wf * cos(wf * 3.24 * q2.x + time * 1.96); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d = d1 * d2;
	vec3 col = palette(d * 0.45 + time * 0.20, vec3(0.41, 0.55, 0.43), vec3(0.43, 0.39, 0.39), vec3(1.01, 0.82, 0.81), vec3(0.19, 0.58, 0.46));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
