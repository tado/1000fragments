uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.68 + t * 2.32 + ph) + sin(p.y * 13.36 - t * 3.32 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.55 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.70) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.76 * p.y + time * 0.71); p.y += 0.34 / wf * cos(wf * 2.67 * p.x + time * 0.78); }
	p = abs(p) - 0.29;
	p += vec2(-0.18, -0.74) * sin(length(p) * 3.75 - time * 1.38) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.87);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.47 + time * 0.26, vec3(0.40, 0.45, 0.57), vec3(0.38, 0.43, 0.44), vec3(0.73, 1.31, 1.17), vec3(0.76, 0.23, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
