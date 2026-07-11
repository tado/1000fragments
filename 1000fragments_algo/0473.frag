uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.73;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.30 + 0.06 * sin(t * 1.65 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.71 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.55) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 5.35 + (time * 0.80) * 3.51) * 0.32;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.36, lr * 2.62 + (time * 0.80) * 0.59); }
	q2 += vec2(-0.26, 0.80) * sin(length(q2) * 2.66 - (time * 0.80) * 1.49) * 0.23;
	float d1 = fieldA(q1, (time * 0.80), 0.0);
	float d2 = fieldB(q2, (time * 0.80), 1.77);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.80) * 0.72));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.02, 0.05), vec3(0.65, 0.73, 0.76), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.80)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.947, 0.991) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
