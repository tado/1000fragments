uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.97 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.47 + t * 1.17 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.32 + sr * 9.97 - t * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 19.9) + 0.5) / 19.9;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.52; q2 = rot2(2.58) * q2; }
	q2 = rot2(length(q2) * -2.03 + time * 1.05) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.45));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.29, 0.33), vec3(0.88, 0.78, 0.88), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
