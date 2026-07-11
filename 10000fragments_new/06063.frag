uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.19 + t * 5.71 + ph) + sin(p.y * 10.25 - t * 2.83 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.14 + ph), sin(lt * 2.0 + t * 0.45)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.70) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.74 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.66 + t * 3.45 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.50; q2 = rot2(0.44) * q2; }
	q3 = abs(q3) - 0.57;
	q3 += vec2(0.25, 0.13) * sin(length(q3) * 2.47 - time * 2.12) * 0.31;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d3 = fieldC(q3, time, 0.47);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.24, vec3(0.49, 0.52, 0.48), vec3(0.38, 0.46, 0.47), vec3(1.20, 0.97, 1.09), vec3(0.15, 0.66, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
