uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.28 * sin(mf + 3.0) + ph), cos(t * 1.28 * cos(mf + 3.0) + ph));
        ms += 0.092 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.08 * p.y + time * 0.68); p.y += 0.41 / wf * cos(wf * 2.77 * p.x + time * 0.87); }
	{ p = vec2(atan(p.y, p.x) * 2.66, length(p) * 5.38 - time * 0.75); }
	p = rot2(0.76) * p;
	p += vec2(-0.30, 0.98) * sin(length(p) * 4.47 - time * 0.64) * 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.57));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
