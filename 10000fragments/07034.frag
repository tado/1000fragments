uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.21 + t * 1.13 + ph) + sin(p.y * 3.59 - t * 3.70 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.82 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.58 + t * 2.66 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.76 + t * 0.64) - 0.5) * 2.0;
    v = sin((p.y * 2.35 + zx * 0.96 + t * 1.31) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 19.0) + 0.5) / 19.0;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.09));
	q2 *= 1.0 + 0.40 * sin(time * 2.78);
	q3.y += sin(q3.x * 7.39 + time * 1.75) * 0.25;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d3 = fieldC(q3, time, 0.66);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.01, 0.36), vec3(0.94, 0.75, 0.94), cc);
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
