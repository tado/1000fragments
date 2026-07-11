uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.86 + vec2(t * 2.41, -t * 2.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.93 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.30 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.94) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2.y += sin(q2.x * 5.64 + time * 3.34) * 0.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.19 + time * 0.02, vec3(0.46, 0.45, 0.58), vec3(0.48, 0.49, 0.31), vec3(0.71, 1.31, 0.79), vec3(0.04, 0.90, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
