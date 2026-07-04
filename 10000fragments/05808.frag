uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.72 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(0.55) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 1.63 * p.y + time * 0.94); p.y += 0.49 / wf * cos(wf * 3.22 * p.x + time * 2.16); }
	p += vec2(0.66, 0.41) * sin(length(p) * 4.80 - time * 1.16) * 0.25;
	p.x += sin(p.y * 3.83 + time * 3.55) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.91, 0.77, 0.23) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 2.03 + time * 17.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
