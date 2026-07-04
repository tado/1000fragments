uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.79;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.05 * sin(t * 2.83 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.12 + sr * 14.51 - t * 0.62 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.15 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.41 + t * 2.75 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1);
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.89));
	{ q3 = vec2(atan(q3.y, q3.x) * 1.13, length(q3) * 5.86 - time * 0.72); }
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d3 = fieldC(q3, time, 1.04);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.55 + time * 0.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
