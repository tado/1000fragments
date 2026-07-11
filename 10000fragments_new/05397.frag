uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.49 + t * 3.65 + ph) + sin(p.y * 3.89 - t * 3.65 + ph)
        + sin((p.x + p.y) * 3.46 + t * 3.65 + ph) + sin(length(p) * 6.69 - t * 3.65 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.45 + t * 4.61 + ph) + sin(p.y * 9.13 - t * 4.61 + ph)
        + sin((p.x + p.y) * 2.70 + t * 4.61 + ph) + sin(length(p) * 6.76 - t * 4.61 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.83 + sr * 11.18 - t * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.53, length(q3) * 4.18 - time * 0.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d3 = fieldC(q3, time, 0.32);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.30, 0.17), vec3(0.97, 0.67, 0.96), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
