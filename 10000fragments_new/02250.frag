uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.97;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.46; kp = rot2(0.69) * kp; kp *= 1.23; }
    v = sin(kp.x * 1.66 - t * 4.37 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.80 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.84 + t * 1.26 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.46, length(q2) * 3.57 - time * 0.74); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.84);
	float d = max(d1, d2);
	vec3 col = vec3(0.15, 0.94, 0.38) * (0.06 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.80 + 0.14 * sin(gl_FragCoord.y * 1.28 + time * 13.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
