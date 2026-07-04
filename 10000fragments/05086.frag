uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.08, t * 0.94 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.23 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.15 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.99) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 32.30 - t * 1.02 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 31.88 - t * 3.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d3 = fieldC(q3, time, 0.34);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.30, 0.36), vec3(0.59, 0.78, 0.62), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
