uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.36 * sin(mf + 3.0) + ph), cos(t * 1.36 * cos(mf + 3.0) + ph));
        ms += 0.033 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	{ p = vec2(atan(p.y, p.x) * 2.50, length(p) * 3.83 - time * 0.77); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.08, lr * 1.72 + time * 0.80); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.64 * p.y + time * 0.96); p.y += 0.21 / wf * cos(wf * 3.20 * p.x + time * 1.56); }
	p = abs(p) - 0.53;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
