uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.33 * sin(mf + 3.0) + ph), cos(t * 0.79 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.13 + t * 4.95 + ph) + sin(p.y * 3.50 - t * 4.95 + ph)
        + sin((p.x + p.y) * 7.43 + t * 4.95 + ph) + sin(length(p) * 8.01 - t * 4.95 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.19 + ga * 5.0 - t * 2.67 + ph);
    v = arm * exp(-gr * 0.62);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 1.58 + time * 0.93) * q1;
	q2 = fract(q2 * 2.29) - 0.5;
	q2 *= 1.44;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.50, lr * 1.62 + time * 0.75); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.24 / wf * sin(wf * 3.78 * q3.y + time * 1.69); q3.y += 0.45 / wf * cos(wf * 2.24 * q3.x + time * 1.65); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d3 = fieldC(q3, time, 0.65);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = hue(d * 1.04 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
