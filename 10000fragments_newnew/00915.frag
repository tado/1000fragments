uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.47;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.77; kp = rot2(1.87) * kp; kp *= 1.25; }
    v = sin(kp.y * 3.97 - t * 3.33 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.72 * sin(mf + 3.0) + ph), cos(t * 0.78 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.21 * jf)) * 0.85;
        xs += sin(length(p - im) * 216.18 - t * 4.14 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(2.18) * q1;
	q2 = rot2(length(q2) * 2.66 + time * 0.70) * q2;
	q3 = (floor(q3 * 16.2) + 0.5) / 16.2;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q3.x += 0.37 / wf * sin(wf * 2.38 * q3.y + time * 1.06); q3.y += 0.48 / wf * cos(wf * 3.28 * q3.x + time * 0.61); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d3 = fieldC(q3, time, 0.63);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.67 + time * 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
