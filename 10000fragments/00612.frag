uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.62;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.47; kp = rot2(0.62) * kp; kp *= 1.44; }
    v = sin(kp.x * 2.75 - t * 1.27 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.92 + t * 4.20 + ph) + sin(p.y * 8.59 - t * 2.52 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.45;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.18) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.85) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.61;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.73, lr * 2.42 + time * 0.44); }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.58, length(q3) * 3.42 - time * 0.24); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d3 = fieldC(q3, time, 1.14);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.91 + time * 0.00);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
