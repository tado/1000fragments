uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.02 * sin(mf + 3.0) + ph), cos(t * 1.02 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	p = rot2(0.76) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.83 * p.y + time * 1.48); p.y += 0.30 / wf * cos(wf * 2.53 * p.x + time * 1.82); }
	p = rot2(time * -0.71) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.13), field(p, time, 2.27));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
