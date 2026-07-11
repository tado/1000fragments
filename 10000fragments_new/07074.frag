uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.15) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.41 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.39 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.61) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.35, 0.59) * sin(length(q2) * 3.32 - time * 1.94) * 0.30;
	{ float fr = length(q2); q2 *= 1.0 + -0.33 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.42);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.88, 0.16, 0.76) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 1.31 + time * 6.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
