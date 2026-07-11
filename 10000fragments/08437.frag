uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.74 * sin(mf + 3.0) + ph), cos(t * 0.74 * cos(mf + 3.0) + ph));
        ms += 0.097 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p = rot2(p.y * 1.91 + time * 0.81) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.38 * p.y + time * 1.19); p.y += 0.49 / wf * cos(wf * 2.71 * p.x + time * 1.91); }
	p *= 3.24;
	p = rot2(length(p) * 3.11 + time * 0.28) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.10));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
