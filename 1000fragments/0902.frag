uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.59 * sin(mf + 3.0) + ph), cos(t * 0.59 * cos(mf + 3.0) + ph));
        ms += 0.044 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.05 * p.y + time * 1.00); p.y += 0.24 / wf * cos(wf * 2.70 * p.x + time * 1.82); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.15, 1.35, 0.86) + vec3(0.24, 0.04, 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
