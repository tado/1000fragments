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
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.67 + ph), sin(lt * 2.0 + t * 1.08)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.88) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.97 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.23; q1 = rot2(1.84) * q1; }
	q2 = fract(q2 * 2.72) - 0.5;
	q2 += vec2(-0.65, -0.05) * sin(length(q2) * 2.88 - time * 1.82) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.66));
	vec3 col = palette(d * 0.67 + time * 0.32, vec3(0.49, 0.52, 0.52), vec3(0.44, 0.35, 0.41), vec3(1.03, 1.04, 1.27), vec3(0.04, 0.13, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
