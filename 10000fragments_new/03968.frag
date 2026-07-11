uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.17;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.76)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.07 - t * 4.40 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.23 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.58) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.54 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.83 + t * 2.73 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 *= 1.79;
	{ float fr = length(q3); q3 *= 1.0 + 0.37 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.22 / wf * sin(wf * 1.95 * q3.y + time * 1.67); q3.y += 0.40 / wf * cos(wf * 2.86 * q3.x + time * 2.02); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d3 = fieldC(q3, time, 1.37);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.35 + time * 0.30, vec3(0.60, 0.58, 0.55), vec3(0.48, 0.37, 0.40), vec3(0.93, 1.04, 0.71), vec3(0.77, 0.42, 0.28));
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.85 + time * 5.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
