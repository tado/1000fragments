uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.58 + vec2(t * 1.06, -t * 1.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	p *= 2.33;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.10 * p.y + time * 1.08); p.y += 0.22 / wf * cos(wf * 2.63 * p.x + time * 1.72); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.27));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
