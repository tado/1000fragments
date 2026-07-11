uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.04 * sin(mf + 3.0) + ph), cos(t * 2.04 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.72 * p.y + time * 0.96); p.y += 0.32 / wf * cos(wf * 3.38 * p.x + time * 1.41); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.59 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.04));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
