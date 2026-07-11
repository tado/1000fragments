uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.84;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.69; kp = rot2(2.62) * kp; kp *= 1.19; }
    v = sin(kp.x * 2.91 - t * 4.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.65 + t * 3.75 + ph) + sin(p.y * 3.74 - t * 3.75 + ph)
        + sin((p.x + p.y) * 10.54 + t * 3.75 + ph) + sin(length(p) * 13.62 - t * 3.75 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.26 + 0.33 * sin(t * 1.49)) + vec2(-0.81, 0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.29 / wf * sin(wf * 3.62 * q1.y + time * 0.62); q1.y += 0.37 / wf * cos(wf * 3.14 * q1.x + time * 1.39); }
	q2 = rot2(q2.y * -3.18 + time * 0.72) * q2;
	q2 = rot2(time * -0.55) * q2;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.05, lr * 2.09 + time * -0.51); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.42);
	float d3 = fieldC(q3, time, 0.47);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.26));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.79 + time * 0.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
