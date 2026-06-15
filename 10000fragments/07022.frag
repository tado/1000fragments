uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.09 + vec2(t * 2.56, -t * 2.56) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.67 * p.y + time * 1.19); p.y += 0.23 / wf * cos(wf * 1.66 * p.x + time * 1.29); }
	{ float fr = length(p); p *= 1.0 + 0.51 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.40));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
