uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.69 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.25 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.40) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.31 + t * 2.60 + ph) * 0.7;
    float wb = sin(p.y * 13.72 - t * 2.60 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.45;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 2.15 * q2.y + time * 1.92); q2.y += 0.31 / wf * cos(wf * 3.88 * q2.x + time * 1.38); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.21);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.13 + time * 0.17);
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 2.98 + time * 5.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
