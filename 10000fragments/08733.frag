uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.38 * sin(mf + 3.0) + ph), cos(t * 2.38 * cos(mf + 3.0) + ph));
        ms += 0.085 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.59 * p.y + time * 1.23); p.y += 0.44 / wf * cos(wf * 3.06 * p.x + time * 1.84); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.45, lr * 2.65 + time * 0.30); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.30, 1.31, 0.76) + vec3(0.27, 0.03, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
