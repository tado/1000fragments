uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.58 * sin(mf + 3.0) + ph), cos(t * 2.05 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.92 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.56 + t * 2.43 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.19;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.47; kp = rot2(0.67) * kp; kp *= 1.20; }
    v = sin(kp.x * 2.33 - t * 2.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = fract(q2 * 2.91) - 0.5;
	q2 *= 2.03;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.77);
	float d3 = fieldC(q3, time, 0.25);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.21));
	vec3 col = vec3(0.29, 0.44, 0.76) * (0.21 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.30 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
