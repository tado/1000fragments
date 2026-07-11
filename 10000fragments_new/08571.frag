uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.76 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	p = fract(p * 1.90) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.97 * p.y + time * 0.76); p.y += 0.20 / wf * cos(wf * 2.01 * p.x + time * 1.10); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.23, 0.16, 0.35) * (0.19 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
