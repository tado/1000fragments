uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.21 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.58) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.84 + t * 4.26 + ph) + sin(p.y * 11.08 - t * 4.26 + ph)
        + sin((p.x + p.y) * 10.94 + t * 4.26 + ph) + sin(length(p) * 17.11 - t * 4.26 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.48 / wf * sin(wf * 2.30 * q1.y + time * 0.89); q1.y += 0.22 / wf * cos(wf * 1.50 * q1.x + time * 1.57); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.17);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.76 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
