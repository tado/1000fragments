uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.49 * sin(mf + 3.0) + ph), cos(t * 1.46 * cos(mf + 3.0) + ph));
        ms += 0.085 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.15 * p.y + time * 1.17); p.y += 0.39 / wf * cos(wf * 1.80 * p.x + time * 2.08); }
	p.y += sin(p.x * 4.68 + time * 2.45) * 0.36;
	{ p = vec2(atan(p.y, p.x) * 1.45, length(p) * 4.84 - time * 0.21); }
	p *= 3.09;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.52 + time * 0.16);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.84 + time * 15.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
