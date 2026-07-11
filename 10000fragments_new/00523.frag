uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.17 + t * 1.68 + ph) + sin(p.y * 12.51 - t * 1.68 + ph)
        + sin((p.x + p.y) * 4.76 + t * 1.68 + ph) + sin(length(p) * 12.74 - t * 1.68 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.94 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.87) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 6.85 * sin(t * 1.01) + t * 1.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1);
	q1.y += sin(q1.x * 5.94 + time * 1.98) * 0.14;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.83, lr * 1.05 + time * 0.62); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d3 = fieldC(q3, time, 1.39);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.56 + time * 0.24, vec3(0.42, 0.58, 0.59), vec3(0.41, 0.38, 0.50), vec3(0.85, 1.30, 1.17), vec3(0.16, 0.58, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
