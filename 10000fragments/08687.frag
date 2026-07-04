uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.08 - t * 1.64;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.74 + sr * 18.02 - t * 4.34 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.84;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.18) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 2.37) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.40, length(q1) * 3.90 - time * 0.45); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.47 / wf * sin(wf * 2.67 * q1.y + time * 1.33); q1.y += 0.37 / wf * cos(wf * 2.90 * q1.x + time * 1.71); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d3 = fieldC(q3, time, 1.28);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.79 + time * 0.82);
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
