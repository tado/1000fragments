uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.00 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.49 + t * 2.93 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.76) - 0.5;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.94));
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.86 * p.y + time * 1.11); p.y += 0.20 / wf * cos(wf * 2.53 * p.x + time * 0.79); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.61, 1.36, 1.46) + vec3(0.28, 0.29, 0.14);
	col = fract(col * 2.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
