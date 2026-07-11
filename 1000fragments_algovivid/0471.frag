uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.24 + t * 1.17 + ph) * 0.7;
    float wb = sin(p.y * 10.31 - t * 2.75 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.55;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.71 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.06 + t * 2.39 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.57 + sin(p.y * 2.59 + t * 3.42) * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = sin(q2 * 1.80 + (time * 0.81) * 0.79) * 0.91;
	q3 = sin(q3 * 1.90 + (time * 0.81) * 2.47) * 1.45;
	q3 = (floor(q3 * 15.1) + 0.5) / 15.1;
	float d1 = fieldA(q1, (time * 0.81), 0.0);
	float d2 = fieldB(q2, (time * 0.81), 1.74);
	float d3 = fieldC(q3, (time * 0.81), 1.20);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.19, 0.16), vec3(0.71, 0.72, 0.67), cc);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.939, 0.961, 1.039) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
