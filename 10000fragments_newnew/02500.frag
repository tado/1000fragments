uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 8.63 - t * 7.16 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 24.45 - t * 7.86 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.88 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.55) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.35, length(q2) * 3.24 - time * 0.67); }
	{ float fr = length(q2); q2 *= 1.0 + -0.31 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.87);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.47));
	vec3 col = palette(d * 0.76 + time * 0.25, vec3(0.56, 0.54, 0.42), vec3(0.33, 0.42, 0.43), vec3(1.16, 0.76, 1.28), vec3(0.66, 0.85, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
