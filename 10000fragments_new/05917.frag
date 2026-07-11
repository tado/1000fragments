uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.17 * cos(sa * 9.0 + t * 0.67 + ph);
    v = sin((sr - petal) * 9.86);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.86 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 14.3) + 0.5) / 14.3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.28));
	vec3 col = palette(d * 1.10 + time * 0.27, vec3(0.41, 0.47, 0.52), vec3(0.45, 0.43, 0.44), vec3(0.78, 1.04, 1.39), vec3(0.94, 0.07, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
