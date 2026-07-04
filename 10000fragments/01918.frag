uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.88 + t * 1.38 + ph) + sin(p.y * 3.70 - t * 1.38 + ph)
        + sin((p.x + p.y) * 5.61 + t * 1.38 + ph) + sin(length(p) * 6.73 - t * 1.38 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.36 + ph), sin(lt * 3.0 + t * 1.02)) * 0.63;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.80) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.08 + sr * 9.58 - t * 1.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 1.50 + time * 1.05) * 1.23;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.05, lr * 1.01 + time * 0.23); }
	q3 += vec2(0.32, 0.74) * sin(length(q3) * 5.56 - time * 1.51) * 0.25;
	{ float fr = length(q3); q3 *= 1.0 + -0.76 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.03);
	float d3 = fieldC(q3, time, 1.36);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.99));
	vec3 col = vec3(0.83, 0.91, 0.44) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
