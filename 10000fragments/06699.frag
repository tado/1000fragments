uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.44;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.51) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.51) * sin(3.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.50 + ph), sin(lt * 2.0 + t * 0.55)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.86) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.41 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.49 / wf * sin(wf * 2.94 * q1.y + time * 1.10); q1.y += 0.42 / wf * cos(wf * 2.98 * q1.x + time * 1.76); }
	q2 *= 2.63;
	q2 = sin(q2 * 2.46 + time * 1.87) * 1.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.76, 0.81, 0.84) * (0.21 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.88 + 0.10 * sin(gl_FragCoord.y * 1.41 + time * 17.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
