uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.59 + t * 2.40 + ph) * 0.7;
    float wb = sin(p.y * 14.59 - t * 0.89 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.47;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.36 * jf)) * 0.71;
        xs += sin(length(p - im) * 158.56 - t * 12.87 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.02;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.56; kp = rot2(1.92) * kp; kp *= 1.16; }
    v = sin(kp.x * 2.26 - t * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 5.81 + time * 1.81) * 0.30;
	q2 *= 1.0 + 0.19 * sin(time * 3.16);
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.45; q2 = rot2(1.82) * q2; }
	q3 = rot2(length(q3) * 3.10 + time * 0.54) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.21);
	float d3 = fieldC(q3, time, 0.40);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.89 + time * 0.06, vec3(0.41, 0.54, 0.53), vec3(0.47, 0.33, 0.48), vec3(0.93, 1.39, 1.12), vec3(0.93, 0.49, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
