uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.12 * sin(mf + 3.0) + ph), cos(t * 2.12 * cos(mf + 3.0) + ph));
        ms += 0.035 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.47 * p.y + time * 1.80); p.y += 0.34 / wf * cos(wf * 3.46 * p.x + time * 1.48); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.12, 1.37, 1.28) + vec3(0.02, 0.08, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
