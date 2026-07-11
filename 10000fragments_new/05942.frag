uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.94 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.01) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.18 * jf)) * 0.89;
        xs += sin(length(p - im) * 80.69 - t * 12.00 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.80 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.11) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * 0.90) * q1;
	q1 = rot2(length(q1) * 2.19 + time * 0.73) * q1;
	q2 = rot2(time * -0.39) * q2;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.39 / wf * sin(wf * 1.77 * q2.y + time * 1.41); q2.y += 0.26 / wf * cos(wf * 2.09 * q2.x + time * 1.08); }
	q3 = rot2(length(q3) * 1.65 + time * 0.60) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d3 = fieldC(q3, time, 0.49);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.49));
	vec3 col = vec3(0.79, 0.37, 0.16) * (0.23 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
