uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.61 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.40) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.97 + 0.33 * sin(t * 1.60)) + vec2(-0.21, 0.05) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.66;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.56 - t * 2.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 *= 3.18;
	q2 = rot2(length(q2) * 2.49 + time * 0.68) * q2;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q3.x += 0.39 / wf * sin(wf * 2.39 * q3.y + time * 1.31); q3.y += 0.34 / wf * cos(wf * 3.89 * q3.x + time * 0.83); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.42);
	float d3 = fieldC(q3, time, 1.23);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.36, 0.11), vec3(0.81, 0.65, 0.70), cc);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.13 + time * 15.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
