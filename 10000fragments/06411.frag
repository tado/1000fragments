uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.45 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.05) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.04 + t * 0.51) - 0.5) * 2.0;
    v = sin((p.y * 5.85 + zx * 1.19 + t * 2.21) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.52;
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.40);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.17, 0.48), vec3(0.89, 0.91, 0.82), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.68 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
