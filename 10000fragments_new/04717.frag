uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.46 * jf)) * 1.00;
        xs += sin(length(p - im) * 95.94 - t * 12.51 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.96 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.12 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.42) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.18, -0.36) * sin(length(q1) * 3.72 - time * 1.65) * 0.35;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.30);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.45));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.12, 0.79, 0.51) + vec3(0.22, 0.23, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
