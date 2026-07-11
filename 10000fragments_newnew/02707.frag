uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.45 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.06) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 5.89 + time * 2.29) * 0.12;
	{ p = vec2(atan(p.y, p.x) * 1.92, length(p) * 5.74 - time * 0.42); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.08 * p.y + time * 0.79); p.y += 0.35 / wf * cos(wf * 3.25 * p.x + time * 2.20); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(1.20) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.59 + time * 0.28);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
