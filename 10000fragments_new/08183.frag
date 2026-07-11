uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.77 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.28 + t * 1.64 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.25;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.41) * kp; kp *= 1.35; }
    v = sin(kp.y * 1.20 - t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.42);
	float d = d1 * d2;
	vec3 col = palette(d * 1.11 + time * 0.21, vec3(0.54, 0.42, 0.47), vec3(0.38, 0.43, 0.35), vec3(1.39, 0.70, 1.18), vec3(0.66, 0.57, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
