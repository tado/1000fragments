uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.73 + vec2(t * 1.42, -t * 1.42) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p += vec2(0.07, -0.30) * sin(length(p) * 3.41 - time * 0.69) * 0.15;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.03 * p.y + time * 1.95); p.y += 0.22 / wf * cos(wf * 2.04 * p.x + time * 1.00); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.46));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
