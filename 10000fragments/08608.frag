uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.92 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.54 + t * 1.28 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.72 + sr * 13.44 - t * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.52));
	q2 += vec2(-0.88, 0.46) * sin(length(q2) * 5.84 - time * 0.87) * 0.14;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.30; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.70);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.93 + time * 0.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
