uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.68 + sr * 21.42 - t * 2.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.47 * p.y + time * 0.82); p.y += 0.40 / wf * cos(wf * 3.65 * p.x + time * 0.80); }
	p += vec2(0.03, -0.15) * sin(length(p) * 2.90 - time * 1.99) * 0.24;
	{ p = vec2(atan(p.y, p.x) * 2.78, length(p) * 3.68 - time * 0.59); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.98));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
