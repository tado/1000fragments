uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.36 + vec2(t * 2.70, -t * 1.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.27 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.97, lr * 2.78 + time * 0.92); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.10);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.22 + time * 0.27, vec3(0.53, 0.43, 0.44), vec3(0.46, 0.35, 0.47), vec3(0.87, 0.94, 1.22), vec3(0.12, 0.49, 0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
