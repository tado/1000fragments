uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 17.56 - t * 4.88 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 37.18 - t * 4.11 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.91 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.02) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.96; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.96 * p.y + time * 1.61); p.y += 0.26 / wf * cos(wf * 3.21 * p.x + time * 1.93); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.75 + time * 0.02, vec3(0.55, 0.42, 0.48), vec3(0.33, 0.38, 0.40), vec3(1.38, 1.08, 1.27), vec3(0.11, 0.73, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
