uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.37 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.19 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.85) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.75 * p.y + time * 1.85); p.y += 0.49 / wf * cos(wf * 2.83 * p.x + time * 1.89); }
	p = rot2(1.19) * p;
	p = rot2(length(p) * 2.81 + time * 0.60) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.51, lr * 1.82 + time * 0.96); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.16, 0.24), vec3(0.96, 0.53, 0.59), d);
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
