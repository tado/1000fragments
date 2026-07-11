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
        float ang = ff * 2.3999632 + t * 0.97 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.87) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.13 * p.y + time * 1.45); p.y += 0.24 / wf * cos(wf * 2.16 * p.x + time * 1.65); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.27, vec3(0.40, 0.45, 0.51), vec3(0.38, 0.40, 0.33), vec3(1.32, 0.90, 0.81), vec3(0.85, 0.27, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
