uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.63 + sin(p.y * 5.27 + t * 1.11) * 4.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.83 * p.y + time * 0.72); p.y += 0.31 / wf * cos(wf * 2.17 * p.x + time * 1.75); }
	{ float fr = length(p); p *= 1.0 + 0.34 * fr * fr; }
	p = abs(p);
	p = fract(p * 1.36) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.10));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
