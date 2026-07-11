uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.79 + sin(p.y * 1.05 + t * 5.29) * 1.02 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.80;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.56; kp = rot2(1.18) * kp; kp *= 1.20; }
    v = sin(kp.x * 3.56 - t * 3.11 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.32 + ph), sin(lt * 4.0 + t * 1.44)) * 0.74;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 1.75 + time * 0.78) * q1;
	{ float fr = length(q1); q1 *= 1.0 + 0.71 * fr * fr; }
	q2 = rot2(time * 1.59) * q2;
	q2 = rot2(length(q2) * 1.72 + time * 0.80) * q2;
	q3 = rot2(length(q3) * -2.12 + time * 0.68) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.47);
	float d3 = fieldC(q3, time, 0.47);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.07, 0.01), vec3(0.75, 0.96, 0.50), cc);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
