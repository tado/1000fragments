uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.35 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.09) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.03 + t * 3.59 + ph) + sin(p.y * 9.88 - t * 3.59 + ph)
        + sin((p.x + p.y) * 11.81 + t * 3.59 + ph) + sin(length(p) * 17.90 - t * 3.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.64;
	p *= 0.71;
	p *= 1.38;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.23 * fr * fr; }
	float d1 = fieldA(q1, (time * 0.69), 0.0);
	float d2 = fieldB(q2, (time * 0.69), 0.84);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.86 + (time * 0.69) * 0.10, vec3(0.36, 0.42, 0.39), vec3(0.19, 0.28, 0.24), vec3(0.65, 0.40, 0.73), vec3(0.67, 0.82, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 0.992, 0.982) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
