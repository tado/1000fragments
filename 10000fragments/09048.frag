uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.84;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.69; kp = rot2(1.48) * kp; kp *= 1.30; }
    v = sin(kp.y * 3.37 - t * 4.78 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 5.14 * sin(t * 1.13) + t * 1.33 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.40 * sin(mf + 3.0) + ph), cos(t * 0.33 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.32 / wf * sin(wf * 3.56 * q1.y + time * 1.62); q1.y += 0.43 / wf * cos(wf * 1.96 * q1.x + time * 1.06); }
	q1 = abs(q1) - 0.47;
	q2 = abs(q2) - 0.64;
	q3 = fract(q3 * 1.09) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.06);
	float d3 = fieldC(q3, time, 1.37);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.09 + time * 0.21, vec3(0.41, 0.45, 0.52), vec3(0.38, 0.45, 0.39), vec3(1.37, 1.17, 1.15), vec3(0.21, 0.40, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
