uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.71 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.00) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.75;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.72; kp = rot2(2.76) * kp; kp *= 1.30; }
    v = sin(kp.y * 1.45 - t * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.62;
	{ float fr = length(q1); q1 *= 1.0 + -0.35 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.91);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.31));
	vec3 col = palette(d * 0.70 + time * 0.31, vec3(0.51, 0.42, 0.55), vec3(0.44, 0.47, 0.44), vec3(1.17, 0.82, 0.73), vec3(0.22, 0.73, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
