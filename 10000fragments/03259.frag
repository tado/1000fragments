uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.72 * sin(mf + 3.0) + ph), cos(t * 0.37 * cos(mf + 3.0) + ph));
        ms += 0.070 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 2.29 - time * 0.78); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.00 * p.y + time * 1.17); p.y += 0.31 / wf * cos(wf * 2.25 * p.x + time * 1.09); }
	p = rot2(p.y * 3.31 + time * 0.23) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.37, 0.32), vec3(0.93, 0.75, 0.48), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
