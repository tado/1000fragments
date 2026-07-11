uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.65 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.77) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.38 - t * 3.63 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.56, length(q1) * 3.87 - time * 0.41); }
	q2.x += sin(q2.y * 7.85 + time * 3.16) * 0.10;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.40, lr * 2.47 + time * 0.21); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.03);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.90));
	vec3 col = palette(d * 0.65 + time * 0.27, vec3(0.46, 0.59, 0.52), vec3(0.37, 0.46, 0.35), vec3(1.00, 1.31, 1.27), vec3(0.60, 0.90, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
