uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.85 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.24) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.21 * cos(sa * 7.0 + t * 1.17 + ph);
    v = sin((sr - petal) * 14.53);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.22, -0.13) * sin(length(p) * 2.99 - time * 1.75) * 0.26;
	p = (floor(p * 23.2) + 0.5) / 23.2;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.53 * p.y + time * 1.53); p.y += 0.33 / wf * cos(wf * 2.97 * p.x + time * 1.34); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.06);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.23 + time * 0.06, vec3(0.53, 0.47, 0.56), vec3(0.34, 0.47, 0.40), vec3(1.04, 1.37, 1.32), vec3(0.30, 0.42, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
