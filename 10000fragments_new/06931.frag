uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.03, t * 0.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.11;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.42; kp = rot2(1.13) * kp; kp *= 1.25; }
    v = sin(kp.y * 3.29 - t * 4.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.49; q1 = rot2(1.73) * q1; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.29 / wf * sin(wf * 2.42 * q2.y + time * 0.68); q2.y += 0.38 / wf * cos(wf * 3.38 * q2.x + time * 2.07); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.65);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.19, vec3(0.60, 0.44, 0.47), vec3(0.46, 0.38, 0.31), vec3(0.72, 0.77, 1.25), vec3(0.13, 0.57, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
