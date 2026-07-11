uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.40 * sin(mf + 3.0) + ph), cos(t * 0.40 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 3.64 - time * 0.53); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.12 * p.y + time * 1.36); p.y += 0.22 / wf * cos(wf * 2.49 * p.x + time * 1.05); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.97, 1.36, 1.40) + vec3(0.13, 0.15, 0.03);
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
