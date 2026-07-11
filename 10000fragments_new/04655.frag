uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.82 + t * 3.20 + ph) + sin(p.y * 8.02 - t * 3.05 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.81 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.01) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.81, length(q1) * 4.19 - time * 0.92); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.35);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.44, 0.93, 0.57) + vec3(0.22, 0.19, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
