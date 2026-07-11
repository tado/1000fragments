uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.04 * sin(mf + 3.0) + ph), cos(t * 2.04 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.53 * p.y + time * 0.91); p.y += 0.44 / wf * cos(wf * 3.92 * p.x + time * 0.95); }
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 3.24 - time * 0.13); }
	p = fract(p * 2.23) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.54));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
